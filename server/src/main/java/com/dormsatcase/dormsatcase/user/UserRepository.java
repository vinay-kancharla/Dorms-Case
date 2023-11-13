package com.dormsatcase.dormsatcase.user;

import com.dormsatcase.dormsatcase.user.User;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    //List<User> findBySize(int size);
    //List<User> findByNameAndPassword(String email, String password);
    boolean existsByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
}
