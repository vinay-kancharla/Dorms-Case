package com.dormsatcase.dormsatcase;

import com.dormsatcase.dormsatcase.user.User;
import com.dormsatcase.dormsatcase.user.UserRepository;
import com.dormsatcase.dormsatcase.user.UserService;
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
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void testSignIn() throws Exception {
        // user does not exist in the database
        when(userRepository.findByEmailAndPassword("DNE", "DNE"))
                .thenReturn(Optional.empty());
        Optional<UUID> userDNE = userService.signIn("DNE", "DNE");
        assertFalse(userDNE.isPresent());

        // user exists in the database
        String uuidStr = "00000000-0000-0000-0000-000000000000";
        UUID uuid = UUID.fromString(uuidStr);
        User mockUser = new User("EXISTS", "EXISTS", uuid);
        when(userRepository.findByEmailAndPassword("EXISTS", "EXISTS"))
                .thenReturn(Optional.of(mockUser));
        Optional<UUID> userIdentifier = userService.signIn("EXISTS", "EXISTS");
        assertEquals(userIdentifier.get(), uuid);
    }

    @Test
    void testSignUp() throws Exception {
        // email does not exist in the database
        when(userRepository.existsByEmail("DNE"))
                .thenReturn(false);
        Optional<UUID> userIdentifier = userService.signUp("DNE", "DNE");
        assertTrue(userIdentifier.isPresent());

        // email exists in the database
        when(userRepository.existsByEmail("EXISTS"))
                .thenReturn(true);
        Optional<UUID> userIdentifier2 = userService.signUp("EXISTS", "EXISTS");
        assertFalse(userIdentifier2.isPresent());
    }

}
