package com.dormsatcase.dormsatcase.dorm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DormService {

    @Autowired
    private DormRepository dormRepository;

    public Dorm get(String dormName) {
        return dormRepository.findByName(dormName).orElseThrow(() -> new EntityNotFoundException("Dorm not found"));
    }

    public List<Dorm> getAll(String experience) {
        log.info("Getting all dorms in an experience.");
        return dormRepository.findByExperience(experience);
    }

    public List<Dorm> getAllRanked(String experience) {
        return dormRepository.findByExperienceOrderByAverageRatingDesc(experience);
    }
}