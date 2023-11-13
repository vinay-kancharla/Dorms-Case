package com.dormsatcase.dormsatcase.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    //List<User> findBySize(int size);
    //List<User> findByNameAndPassword(String email, String password);
    boolean existsByName(String name);
    Optional<User> findByEmailAndPassword(String email, String password);
}
