package com.dormsatcase.dormsatcase;

import com.dormsatcase.dormsatcase.dorm.DormService;
import com.dormsatcase.dormsatcase.review.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.IntNode;
import com.fasterxml.jackson.databind.node.TextNode;
import com.fasterxml.jackson.databind.JsonNode;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.test.web.client.TestRestTemplate;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.core.IsNull.notNullValue;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class ReviewServiceTest {

    @Autowired
    private ReviewService reviewService;

    @Test
    void verifyReviewService() throws Exception {
        assertNotEquals(reviewService, null);
    }

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetAllReviews() throws Exception {
        String dormName = "Cutler House";
        mockMvc.perform(MockMvcRequestBuilders.get("/api/review/getAll?dormName=" + dormName))
        .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void verifyGetAllReviews() throws Exception {
        String dormName = "Cutler House";
        String response = this.restTemplate.getForObject("http://localhost:" + port + "/api/review/getAll?dormName=" + dormName, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonResponse = objectMapper.readTree(response);
        
        assertThat(jsonResponse.isArray(), is(true));
        
        for (JsonNode reviewNode : jsonResponse) {
            assertThat(reviewNode.has("review"), is(true));
            assertThat(reviewNode.get("review"), notNullValue());
            assertThat(reviewNode.get("review"), instanceOf(TextNode.class));
            assertThat(reviewNode.has("image"), is(true));
            assertThat(reviewNode.get("image"), notNullValue());
            assertThat(reviewNode.get("image"), instanceOf(TextNode.class));
            assertThat(reviewNode.has("starrating"), is(true));
            assertThat(reviewNode.get("starrating"), notNullValue());
            assertThat(reviewNode.get("starrating"), instanceOf(IntNode.class));
            assertThat(reviewNode.has("like"), is(true));
            assertThat(reviewNode.get("like"), notNullValue());
            assertThat(reviewNode.get("like"), instanceOf(IntNode.class));
            assertThat(reviewNode.has("dislike"), is(true));
            assertThat(reviewNode.get("dislike"), notNullValue());
            assertThat(reviewNode.get("dislike"), instanceOf(IntNode.class));
        }
    }

}
