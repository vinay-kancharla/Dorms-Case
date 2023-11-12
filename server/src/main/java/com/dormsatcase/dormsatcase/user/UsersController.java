package com.dormsatcase.dormsatcase.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dormsatcase.dormsatcase.user.User;
import com.dormsatcase.dormsatcase.user.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/view")
    public String getAllUsers(Model model) {
        System.out.println("Getting all users");
        List<User> users = userRepo.findAll();
        model.addAttribute("us", users);
        return "users/showAll";
    }

    @PostMapping("/add")
    public String addUser(@RequestParam Map<String, String> newuser, HttpServletResponse response) {
        System.out.println("Add user");
        String newName = newuser.get("name");
        String newPwd = newuser.get("password");
        int newSize = Integer.parseInt(newuser.get("size"));
        userRepo.save(new User(newName, newPwd, newSize));
        response.setStatus(201);
        return "user/addedUser";
    }
}
