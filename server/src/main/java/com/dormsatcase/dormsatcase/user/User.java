package com.dormsatcase.dormsatcase.user;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.dormsatcase.dormsatcase.review.Review;

@Entity
@Table(name="users")
public class User {
    @Id
    private UUID userId;
    private String email;
    private String password;

    @ManyToMany
    @JoinTable(
        name = "user_liked_reviews",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "review_id")
    )
    private Set<Review> likedReviews = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_disliked_reviews",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "review_id")
    )
    private Set<Review> dislikedReviews = new HashSet<>();

    public User() {
        // default constructor needed by database
    }

    public User(String email, String password, UUID userId) {
        this.email = email;
        this.password = password;
        this.userId = userId;
    }

    public UUID getUserId() {
        return this.userId;
    }

    public String getPassword() {
        return this.password;
    }

    public Set<Review> getLikedReviews() {
        return this.likedReviews;
    }

    public Set<Review> getDislikedReviews() {
        return this.dislikedReviews;
    }
}