package com.dormsatcase.dormsatcase.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAll")
    public ResponseEntity<List<JsonNode>> getAll(@RequestParam("dormName") String dormName) {
        return reviewService.getAll(dormName);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllReviews")
    public ResponseEntity<List<ReviewDTO>> getAllReviews(@RequestParam("dormName") String dormName) {
        List<ReviewDTO> reviews = reviewService.getAllReviews(dormName);
        return ResponseEntity.ok(reviews);
    }  

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addReview")
    public ResponseEntity<Review> addReview(@RequestBody ReviewAddDTO reviewAddDTO) {
        Review review = reviewService.addReview(reviewAddDTO);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @PostMapping("/{reviewId}/toggleLike")
    public ResponseEntity<LikedDislikedReviewsDTO> toggleLike(@PathVariable("reviewId") UUID reviewId, @RequestBody LikeDislikeDTO likeDislikeDTO) {
        LikedDislikedReviewsDTO response = reviewService.toggleLike(reviewId, likeDislikeDTO.getUserId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{reviewId}/toggleDislike")
    public ResponseEntity<LikedDislikedReviewsDTO> toggleDislike(@PathVariable("reviewId") UUID reviewId, @RequestBody LikeDislikeDTO likeDislikeDTO) {
        LikedDislikedReviewsDTO response = reviewService.toggleDislike(reviewId, likeDislikeDTO.getUserId());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(UUID reviewIdentifier) {
        return reviewService.delete(reviewIdentifier);
    }
}