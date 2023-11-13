package com.dormsatcase.dormsatcase.user;

import com.dormsatcase.dormsatcase.user.UserRepository;
import com.dormsatcase.dormsatcase.user.UserDTO;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<UUID> signUp(UserDTO userDTO) {
        // there already exists a user with this email address
        if (userRepo.existsByEmail(userDTO.getEmail())) {
            return Optional.empty();
        }

        UUID userIdentifer = UUID.randomUUID();

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setUserIdentifier(userIdentifer);
        userRepo.save(user);

        return Optional.of(userIdentifier);
    }

    public Optional<UUID> signIn(UserDTO userDTO) {
        Optional<User> user = userRepo.findByEmailAndPassword(userDTO.getEmail(),
                userDTO.getPassword());
        if (!user.isPresent()) {
            return Optional.empty();
        }
        return Optional.of(user.getUserIdentifier);
    }

}
