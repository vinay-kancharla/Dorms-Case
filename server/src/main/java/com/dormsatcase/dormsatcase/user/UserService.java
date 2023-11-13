package com.dormsatcase.dormsatcase.user;

import com.dormsatcase.dormsatcase.user.UserRepository;
import com.dormsatcase.dormsatcase.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<UUID> signUp(String email, String password) {
        // there already exists a user with this email address
        if (userRepo.existsByEmail(email)) {
            return Optional.empty();
        }

        UUID userIdentifier = UUID.randomUUID();
        User user = new User(email, password, userIdentifier);
        userRepo.save(user);
        return Optional.of(userIdentifier);
    }

    public Optional<UUID> signIn(String email, String password) {
        Optional<User> optionalUser = userRepo.findByEmailAndPassword(email, password);
        if (!optionalUser.isPresent()) {
            return Optional.empty();
        }
        User user = optionalUser.get();
        return Optional.of(user.getUserIdentifier());
    }

}
