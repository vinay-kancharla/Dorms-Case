package com.dormsatcase.dormsatcase.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/upload")
    public ResponseEntity<Void> upload(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.upload(reviewDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> delete(UUID reviewIdentifier) {
        return reviewService.delete(reviewIdentifier);
    }

    @GetMapping("/add-like")
    public ResponseEntity<Void> addLike(@RequestParam("reviewIdentifier") UUID reviewIdentifier,
                                        @RequestParam("userIdentifier") UUID userIdentifier) {
        return reviewService.addLike(reviewIdentifier, userIdentifier);
    }

    @GetMapping("/add-dislike")
    public ResponseEntity<Void> addDislike(@RequestParam("reviewIdentifier") UUID reviewIdentifier,
                                           @RequestParam("userIdentifier") UUID userIdentifier) {
        return reviewService.addDislike(reviewIdentifier, userIdentifier);
    }


}