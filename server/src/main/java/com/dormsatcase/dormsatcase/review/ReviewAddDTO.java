package com.dormsatcase.dormsatcase.review;

import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ReviewAddDTO {
    private UUID userId;
    private String dormName;
    private double starRating;
    private String imgBase64;
    private Integer likes;
    private Integer dislikes;
    private String body;
}
