package com.dormsatcase.dormsatcase.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

import java.util.Base64;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

import com.dormsatcase.dormsatcase.user.User;
import com.dormsatcase.dormsatcase.dorm.Dorm;
import com.dormsatcase.dormsatcase.dorm.DormRepository;
import com.dormsatcase.dormsatcase.user.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;

import com.dormsatcase.dormsatcase.review.Review;
import com.dormsatcase.dormsatcase.review.ReviewAddDTO;
import com.dormsatcase.dormsatcase.review.ReviewDTO;
import com.dormsatcase.dormsatcase.review.ReviewRepository;
import com.dormsatcase.dormsatcase.review.ImageUploadService;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DormRepository dormRepository;

    public ResponseEntity<List<JsonNode>> getAll(String dormName) {
        log.info("Getting all reviews for a dorm.");
        try {
            String filepath = "./src/main/java/com/dormsatcase/dormsatcase/review/reviews.json";
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File(filepath);

            if (!jsonFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            JsonNode root = objectMapper.readTree(jsonFile);
            JsonNode dormData = root.get(dormName);

            if (dormData == null) {
                return ResponseEntity.noContent().build();
            }

            List<JsonNode> reviews = objectMapper.convertValue(dormData, new TypeReference<List<JsonNode>>() {});
            return ResponseEntity.ok(reviews);
        } 
        catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setStarRating(review.getStarRating());
        dto.setImageUrl(review.getImageUrl());
        dto.setLikes(review.getLikes());
        dto.setDislikes(review.getDislikes());
        dto.setBody(review.getBody());
        return dto;
    }

    public List<ReviewDTO> getAllReviews(String dormName) {
        List<Review> reviews = reviewRepository.findByDormName(dormName);
        return reviews.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private static MultipartFile base64ToMultipartFile(String base64) throws IOException {
        if (base64.contains(",")) {
            base64 = base64.split(",")[1];
        }
        byte[] decodedBytes = Base64.getDecoder().decode(base64);

        return new MockMultipartFile("file", "filename.png", "image/png", decodedBytes);
    }

    public Review addReview(ReviewAddDTO reviewAddDTO) {
        User user = userRepository.findByUserId(reviewAddDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Dorm dorm = dormRepository.findByName(reviewAddDTO.getDormName()).orElseThrow(() -> new RuntimeException("Dorm not found"));

        String imageUrl = "";
        MultipartFile imageFile = null;
        boolean failed = false;
        try {
            imageFile = base64ToMultipartFile(reviewAddDTO.getImgBase64());
        }
        catch (Exception e) {
            log.info(e.getMessage());
            failed = true;
        }
        if (!failed) {
            imageUrl = this.imageUploadService.uploadFile(imageFile);
        }

        Review review = new Review();
        review.setAuthor(user);
        review.setDorm(dorm);
        review.setStarRating(reviewAddDTO.getStarRating());
        review.setImageUrl(imageUrl);
        review.setLikes(reviewAddDTO.getLikes());
        review.setDislikes(reviewAddDTO.getDislikes());
        review.setBody(reviewAddDTO.getBody());
        return reviewRepository.save(review);
    }

    private List<ReviewDTO> convertToReviewDTOs(Set<Review> reviews) {
        return reviews.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public LikedDislikedReviewsDTO toggleLike(UUID reviewId, UUID userId) {
        Review review = reviewRepository.findByReviewId(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getDislikedReviews().contains(review)) {
            review.setDislikes(Math.max(review.getDislikes() - 1, 0));
            user.getDislikedReviews().remove(review);
        }
        if (user.getLikedReviews().contains(review)) {
            review.setLikes(Math.max(review.getLikes() - 1, 0));
            user.getLikedReviews().remove(review);
        }
        else {
            review.setLikes(review.getLikes() + 1);
            user.getLikedReviews().add(review);
        }
        user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
        LikedDislikedReviewsDTO response = new LikedDislikedReviewsDTO();
        response.setLikedReviews(convertToReviewDTOs(user.getLikedReviews()));
        response.setDislikedReviews(convertToReviewDTOs(user.getDislikedReviews()));
        return response;
    }

    @Transactional
    public LikedDislikedReviewsDTO toggleDislike(UUID reviewId, UUID userId) {
        Review review = reviewRepository.findByReviewId(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getLikedReviews().contains(review)) {
            review.setLikes(Math.max(review.getLikes() - 1, 0));
            user.getLikedReviews().remove(review);
        }
        if (user.getDislikedReviews().contains(review)) {
            review.setDislikes(Math.max(review.getDislikes() - 1, 0));
            user.getDislikedReviews().remove(review);
        }
        else {
            review.setDislikes(review.getDislikes() + 1);
            user.getDislikedReviews().add(review);
        }
        user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
        LikedDislikedReviewsDTO response = new LikedDislikedReviewsDTO();
        response.setLikedReviews(convertToReviewDTOs(user.getLikedReviews()));
        response.setDislikedReviews(convertToReviewDTOs(user.getDislikedReviews()));
        return response;
    }

    public ResponseEntity<Void> delete(UUID reviewIdentifier) {
        return ResponseEntity.ok().build();
    }
}
