package com.dormsatcase.dormsatcase.dorm;

import com.dormsatcase.dormsatcase.review.Review;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="dorms")
public class Dorm {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "dorm_id")
    private UUID dormId;

    private String name;

    private String experience;

    @Column(name = "average_rating")
    private Double averageRating;
    // private BigDecimal overallRating;
    // private HashMap<Integer, Integer> starCounts;
    // private List<String> imageUrls;
    // private List<Review> reviews;

    protected Dorm() {

    }

    public Dorm(String name, String experience) {
        this.name = name;
        this.experience = experience;
    }

    public UUID getDormId() {
        return dormId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}