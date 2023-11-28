package com.dormsatcase.dormsatcase.review;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByDormName(String dormName);
}
