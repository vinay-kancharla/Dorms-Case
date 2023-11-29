package com.dormsatcase.dormsatcase.dorm;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DormRepository extends JpaRepository<Dorm, UUID> {
    Optional<Dorm> findByName(String dormName);
    List<Dorm> findByExperience(String experience);
}
