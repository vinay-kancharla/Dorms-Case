package com.dormsatcase.dormsatcase.review;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ReviewService {

    public ResponseEntity<Void> upload(ReviewDTO reviewDTO) {
        return ResponseEntity.ok().build();
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
