package com.dormsatcase.dormsatcase.review;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.List;

@Service
public class ReviewService {

    public ResponseEntity<List<JsonNode>> getAll(String dormName) {
        try {
            String filepath = "./src/main/java/com/dormsatcase/dormsatcase/review/reviews.json";
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File(filepath);

            if (!jsonFile.exists()) {
                return ResponseEntity.notFound().build();
            }

            JsonNode root = objectMapper.readTree(jsonFile);
            JsonNode dormData = root.get(dormName);

            if (dormData == null) {
                return ResponseEntity.noContent().build();
            }

            List<JsonNode> reviews = objectMapper.convertValue(dormData, new TypeReference<List<JsonNode>>() {});
            return ResponseEntity.ok(reviews);
        } 
        catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 

    public ResponseEntity<Void> upload(ReviewDTO reviewDTO) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> delete(UUID reviewIdentifier) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> addLike(UUID reviewIdentifier, UUID userIdentifier) {
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> addDislike(UUID reviewIdentifier, UUID userIdentifier) {
        return ResponseEntity.ok().build();
    }

}
