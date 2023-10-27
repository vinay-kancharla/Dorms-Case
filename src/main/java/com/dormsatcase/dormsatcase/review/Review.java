package com.dormsatcase.dormsatcase.review;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class Review {
    // private UUID identifier;
    // private UUID authorIdentifier;
    // private String dormName;
    // private int numStars;
    // private List<String> imageUrls;
    // private int numLikes;
    // private int numDislikes;
    // private String body;
    private String review;
    private String image;
    private double starRating;
    private int likes;
    private int dislikes;
}