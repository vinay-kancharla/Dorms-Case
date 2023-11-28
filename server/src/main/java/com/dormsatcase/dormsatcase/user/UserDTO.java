package com.dormsatcase.dormsatcase.user;

import lombok.Data;
import java.util.List;
import java.util.UUID;

public class UserDTO {
    private String email;
    private String password;

    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() { return this.email; }

    public String getPassword() { return this.password; }
}
