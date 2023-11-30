package com.dormsatcase.dormsatcase.review;

import java.util.List;

import lombok.Data;

@Data
public class LikedDislikedReviewsDTO {
    private List<ReviewDTO> likedReviews;
    private List<ReviewDTO> dislikedReviews;
}
