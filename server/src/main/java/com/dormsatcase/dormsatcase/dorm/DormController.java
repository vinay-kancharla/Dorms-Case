package com.dormsatcase.dormsatcase.dorm;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dorm")
public class DormController {

    @Autowired
    private DormService dormService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get")
    public ResponseEntity<Dorm> get(@RequestParam("dormName") String dormName) {
        Dorm dorm = dormService.get(dormName);
        return ResponseEntity.ok(dorm);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAll")
    public List<Dorm> getAll(@RequestParam("experience") String experience) {
        return dormService.getAll(experience);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllRanked")
    public List<Dorm> getAllRanked(@RequestParam("experience") String experience) {
        return dormService.getAllRanked(experience);
    }
}
