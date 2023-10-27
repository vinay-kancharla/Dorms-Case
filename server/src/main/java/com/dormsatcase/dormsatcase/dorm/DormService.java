package com.dormsatcase.dormsatcase.dorm;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class DormService {

    public Dorm get(String dormName) {
        return getDummy();
    }

    public List<Dorm> getAll(String experience) {
        List<Dorm> dorms = new ArrayList<>();
        dorms.add(getDummy());
        return dorms;
    }

    public List<Dorm> getTopThree(String experience) {
        List<Dorm> dorms = new ArrayList<>();
        dorms.add(getDummy());
        return dorms;
    }

    private Dorm getDummy() {
        Dorm dorm = new Dorm();
        dorm.setName("Kusch");
        dorm.setExperience("SECOND_YEAR");
        dorm.setOverallRating(BigDecimal.valueOf(5.0));
        HashMap<Integer, Integer> starCounts = new HashMap<>();
        starCounts.put(1, 0);
        starCounts.put(2, 0);
        starCounts.put(3, 0);
        starCounts.put(4, 0);
        starCounts.put(5, 10);
        List<String> imageUrls = new ArrayList<>();
        imageUrls.add("https://case.edu/housing/sites/case.edu.housing/files/styles/hero_one_column/public/2019-05/DSC09579.JPG?h=7686d427&itok=JauUPLAC");
        dorm.setStarCounts(starCounts);
        dorm.setImageUrls(imageUrls);
        dorm.setReviews(new ArrayList<>());
        return dorm;
    }

}
