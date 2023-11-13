package com.dormsatcase.dormsatcase.dorm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DormRepository extends JpaRepository<Dorm, Integer> {
    List<Dorm> findByExperience(String experience);
}
