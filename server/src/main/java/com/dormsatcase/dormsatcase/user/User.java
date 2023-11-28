package com.dormsatcase.dormsatcase.user;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="users")
public class User {
    @Id
    private UUID userId;
    private String email;
    private String password;

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
}