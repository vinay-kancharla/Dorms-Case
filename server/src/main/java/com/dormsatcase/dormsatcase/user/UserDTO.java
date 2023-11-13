package com.dormsatcase.dormsatcase.user;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class UserDTO {
    private String email;
    private String password;
}
