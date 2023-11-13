package com.dormsatcase.dormsatcase.dorm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/dorm")
public class DormController {

    @Autowired
    private DormService dormService;

    @GetMapping("/get")
    public Dorm get(@RequestParam("dormName") String dormName) {
        return dormService.get(dormName);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAll")
    public List<Dorm> getAll(@RequestParam("experience") String experience) {
        return dormService.getAll(experience);
    }

    @GetMapping("/getTopThree")
    public List<Dorm> getTopThree(@RequestParam("experience") String experience) {
        return dormService.getTopThree(experience);
    }
}
