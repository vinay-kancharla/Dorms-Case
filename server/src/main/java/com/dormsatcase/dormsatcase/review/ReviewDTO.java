package com.dormsatcase.dormsatcase.review;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class ReviewDTO {
    private UUID authorIdentifier;
    private String dormName;
    private int numStars;
    private List<String> imageUrls;
    private String body;
}
