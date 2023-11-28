package com.dormsatcase.dormsatcase.user;

import com.dormsatcase.dormsatcase.user.UserRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCrypt;
import com.dormsatcase.dormsatcase.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<UUID> signUp(String email, String password) {
        // there already exists a user with this email address
        if (userRepo.existsByEmail(email)) {
            return Optional.empty();
        }

        UUID userIdentifier = UUID.randomUUID();
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = new User(email, hashedPassword, userIdentifier);
        userRepo.save(user);
        return Optional.of(userIdentifier);
    }

    public Optional<UUID> signIn(String email, String password) {

        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return Optional.empty();
        }
        User user = optionalUser.get();
        String hashedPassword = user.getPassword();
        if (!BCrypt.checkpw(password, hashedPassword)) {
            return Optional.empty();
        }

        return Optional.of(user.getUserId());
    }

}
