package com.dormsatcase.dormsatcase.dorm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class DormService {

    @Autowired
    private DormRepository dormRepository;

    public Dorm get(String dormName) {
        // return getDummy();
        return null;
    }

    public List<Dorm> getAll(String experience) {
        return dormRepository.findByExperience(experience);
    }

    public List<Dorm> getTopThree(String experience) {
        // List<Dorm> dorms = new ArrayList<>();
        // dorms.add(getDummy());
        // return dorms;
        return null;
    }

    // private Dorm getDummy() {
    //     Dorm dorm = new Dorm();
    //     dorm.setName("Kusch");
    //     dorm.setExperience("SECOND_YEAR");
    //     dorm.setOverallRating(BigDecimal.valueOf(5.0));
    //     HashMap<Integer, Integer> starCounts = new HashMap<>();
    //     starCounts.put(1, 0);
    //     starCounts.put(2, 0);
    //     starCounts.put(3, 0);
    //     starCounts.put(4, 0);
    //     starCounts.put(5, 10);
    //     List<String> imageUrls = new ArrayList<>();
    //     imageUrls.add("https://case.edu/housing/sites/case.edu.housing/files/styles/hero_one_column/public/2019-05/DSC09579.JPG?h=7686d427&itok=JauUPLAC");
    //     dorm.setStarCounts(starCounts);
    //     dorm.setImageUrls(imageUrls);
    //     dorm.setReviews(new ArrayList<>());
    //     return dorm;
    // }

}

// package com.dormsatcase.dormsatcase.user;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestAttribute;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.dormsatcase.dormsatcase.user.User;
// import com.dormsatcase.dormsatcase.user.UserRepository;

// import jakarta.servlet.http.HttpServletResponse;

// @RestController
// @RequestMapping("/api/users")
// public class UsersController {

//     @Autowired
//     private UserRepository userRepo;

//     @GetMapping("/view")
//     public String getAllUsers(Model model) {
//         System.out.println("Getting all users");
//         List<User> users = userRepo.findAll();
//         model.addAttribute("us", users);
//         return "users/showAll";
//     }

//     @PostMapping("/add")
//     public String addUser(@RequestParam Map<String, String> newuser, HttpServletResponse response) {
//         System.out.println("Add user");
//         String newEmail = newuser.get("email");
//         String newPwd = newuser.get("password");
//         userRepo.save(new User(newEmail, newPwd));
//         response.setStatus(201);
//         return "user/addedUser";
//     }
// }
