package com.dormsatcase.dormsatcase.review;

import lombok.Data;
import java.util.UUID;

@Data
public class ReviewDTO {
    private UUID reviewId;
    private double starRating;
    private String imageUrl;
    private Integer likes;
    private Integer dislikes;
    private String body;
}
