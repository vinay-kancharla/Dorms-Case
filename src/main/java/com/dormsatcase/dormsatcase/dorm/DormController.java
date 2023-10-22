package com.dormsatcase.dormsatcase.dorm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/dorm")
public class DormController {

    @Autowired
    private DormService dormService;

    @GetMapping("/get")
    public Dorm get(@RequestParam("dormName") String dormName) {
        return dormService.get(dormName);
    }

    @GetMapping("/getAll")
    public String getAll(@RequestParam("experience") String experience) {
        return "Todo 2";
    }

    @GetMapping("/getTopThree")
    public String getTopThree(@RequestParam("experience") String experience) {
        return "Todo 3";
    }
}
