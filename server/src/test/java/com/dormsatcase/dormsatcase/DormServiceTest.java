package com.dormsatcase.dormsatcase;

import com.dormsatcase.dormsatcase.dorm.DormService;
import com.dormsatcase.dormsatcase.review.ReviewService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@SpringBootTest
public class DormServiceTest {

    @Autowired
    private DormService dormService;

    @Test
    void verifyDormService() throws Exception {
        assertNotEquals(dormService, null);
    }

}
