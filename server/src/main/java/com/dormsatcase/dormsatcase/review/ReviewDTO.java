package com.dormsatcase.dormsatcase.review;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class ReviewDTO {
    private UUID reviewId;
    private double starRating;
    private List<String> imageUrls;
    private Integer likes;
    private Integer dislikes;
    private String body;
}