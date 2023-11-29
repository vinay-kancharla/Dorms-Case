package com.dormsatcase.dormsatcase.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

import com.dormsatcase.dormsatcase.user.User;
import com.dormsatcase.dormsatcase.dorm.Dorm;
import com.dormsatcase.dormsatcase.dorm.DormRepository;
import com.dormsatcase.dormsatcase.user.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

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

    public List<ReviewDTO> getAllReviews(String dormName) {
        List<Review> reviews = reviewRepository.findByDormName(dormName);
        return reviews.stream().map(this::convertToDTO).collect(Collectors.toList());
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

    public Review addReview(ReviewAddDTO reviewAddDTO) {
        User user = userRepository.findByUserId(reviewAddDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Dorm dorm = dormRepository.findByName(reviewAddDTO.getDormName()).orElseThrow(() -> new RuntimeException("Dorm not found"));
        Review review = new Review();
        review.setAuthor(user);
        review.setDorm(dorm);
        review.setStarRating(reviewAddDTO.getStarRating());
        review.setImageUrl(reviewAddDTO.getImageUrl());
        review.setLikes(reviewAddDTO.getLikes());
        review.setDislikes(reviewAddDTO.getDislikes());
        review.setBody(reviewAddDTO.getBody());
        return reviewRepository.save(review);
    }

    public ResponseEntity<Void> delete(UUID reviewIdentifier) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> addLike(UUID reviewIdentifier, UUID userIdentifier) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> addDislike(UUID reviewIdentifier, UUID userIdentifier) {
        return ResponseEntity.ok().build();
    }

}
