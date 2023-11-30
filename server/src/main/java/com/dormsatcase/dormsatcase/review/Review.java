package com.dormsatcase.dormsatcase.review;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.dormsatcase.dormsatcase.dorm.Dorm;
import com.dormsatcase.dormsatcase.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name="reviews")
public class Review {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "review_id", nullable = false)
    private UUID reviewId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User author;

    @ManyToOne
    @JoinColumn(name = "dorm_id", nullable = false)
    @JsonBackReference
    private Dorm dorm;

    @Column(nullable = false)
    private double starRating;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = true)
    private Integer likes;

    @Column(nullable = true)
    private Integer dislikes;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    protected Review() {

    }

    public Review(User author, Dorm dorm, double starRating, String imageUrl, String body) {
        this.author = author;
        this.dorm = dorm;
        this.starRating = starRating;
        this.imageUrl = imageUrl != null ? imageUrl : null;
        this.body = body;
    }

    public UUID getReviewId() {
        return this.reviewId;
    }

    public User getAuthor() {
        return this.author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Dorm getDorm() {
        return this.dorm;
    }

    public void setDorm(Dorm dorm) {
        this.dorm = dorm;
    }

    public double getStarRating() {
        return this.starRating;
    }

    public void setStarRating(double starRating) {
        this.starRating = starRating;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl != null ? imageUrl : null;
    }
    
    public Integer getLikes() {
        return this.likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }
    public Integer getDislikes() {
        return this.dislikes;
    }

    public void setDislikes(Integer dislikes) {
        this.dislikes = dislikes;
    }
    
    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}