package com.dormsatcase.dormsatcase.user;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "user_id")
    private UUID userId;

    private String email;

    private String password;

    protected User() {

    }

    public User(String email, String password, UUID user_identifier) {
        this.email = email;
        this.password = password;
        this.userId = user_identifier;
    }

    public UUID getUserId() {
        return this.userId;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}