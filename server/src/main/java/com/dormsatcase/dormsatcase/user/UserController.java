package com.dormsatcase.dormsatcase.user;

import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.dormsatcase.dormsatcase.user.UserDTO;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    /*
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
     */

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/sign-up")
    public Optional<UUID> signUp(@RequestBody UserDTO userDTO) {
        return userService.signUp(userDTO.getEmail(), userDTO.getPassword());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/sign-in")
    public Optional<UUID> signIn(@RequestParam("email")  String email,
                                 @RequestParam("password") String password) {
        return userService.signIn(email, password);
    }
}
