package com.dormsatcase.dormsatcase;

import com.dormsatcase.dormsatcase.user.User;
import com.dormsatcase.dormsatcase.user.UserDTO;
import com.dormsatcase.dormsatcase.user.UserRepository;
import com.dormsatcase.dormsatcase.user.UserService;
import com.dormsatcase.dormsatcase.user.UserController;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;
import java.util.UUID;
import java.util.Optional;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserController userController;

    @MockBean
    private UserRepository userRepository;

    @Test
    void testSignIn() throws Exception {
        // user does not exist in the database
        when(userRepository.findByEmail("DNE"))
                .thenReturn(Optional.empty());

        Optional<UUID> userDNE = userController.signIn("DNE", "DNE");

        assertFalse(userDNE.isPresent());

        // user exists in the database and password is correct
        String uuidStr = "00000000-0000-0000-0000-000000000000";
        UUID uuid = UUID.fromString(uuidStr);
        String hashedPassword = BCrypt.hashpw("EXISTS", BCrypt.gensalt());
        User mockUser = new User("EXISTS", hashedPassword, uuid);

        when(userRepository.findByEmail("EXISTS"))
                .thenReturn(Optional.of(mockUser));

        Optional<UUID> userIdentifier = userController.signIn("EXISTS", "EXISTS");
        assertEquals(userIdentifier.get(), uuid);

        // user exists in the data and password is incorrect
        Optional<UUID> userIdentifier2 = userController.signIn("EXISTS", "WRONG PASSWORD");
        assertFalse(userIdentifier2.isPresent());
    }

    @Test
    void testSignUp() throws Exception {
        // email does not exist in the database
        when(userRepository.existsByEmail("DNE"))
                .thenReturn(false);

        UserDTO userDTO = new UserDTO("DNE", "DNE");

        Optional<UUID> userIdentifier = userController.signUp(userDTO);
        assertTrue(userIdentifier.isPresent());

        // email exists in the database
        when(userRepository.existsByEmail("EXISTS"))
                .thenReturn(true);
        UserDTO userDTO2 = new UserDTO("EXISTS", "EXISTS");
        Optional<UUID> userIdentifier2 = userController.signUp(userDTO2);
        assertFalse(userIdentifier2.isPresent());
    }
}
