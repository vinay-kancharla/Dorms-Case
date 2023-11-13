package com.dormsatcase.dormsatcase.user;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name="users")
public class User {
    //     @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private UUID user_identifier;
    private String email;
    private String password;

    public User() {
        // Default constructor
    }

    public User(String email, String password, UUID user_identifier) {
        this.email = email;
        this.password = password;
        this.user_identifier = user_identifier;
    }

    public String getEmail() {
        return this.email;
    }

    public UUID getUserIdentifier() {
        return this.user_identifier;
    }

}

/*
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    private String name;
    private String password;
    private int size;

    public User(String name, String password, int size) {
        this.name = name;
        this.password = password;
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }
}
 */
