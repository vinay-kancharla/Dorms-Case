package com.dormsatcase.dormsatcase.dorm;

import com.dormsatcase.dormsatcase.review.Review;
import lombok.Data;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

@Data
public class Dorm {
    private String name;
    private String experience;
    private BigDecimal overallRating;
    private HashMap<Integer, Integer> starCounts;
    private List<String> imageUrls;
    private List<Review> reviews;
}
