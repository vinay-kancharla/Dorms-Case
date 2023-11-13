package com.dormsatcase.dormsatcase.user;

import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID userIdentifier;

    private String email;
    private String password;

    protected User() {

    }
    
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
    
    public UUID getUserIdentifier() {
        return userIdentifier;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
}
