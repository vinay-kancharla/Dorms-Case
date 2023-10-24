package com.dormsatcase.dormsatcase.review;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    public ResponseEntity<ReviewDTO> upload(ReviewDTO reviewDTO) {
        return ResponseEntity.ok(reviewDTO);
    }

}
