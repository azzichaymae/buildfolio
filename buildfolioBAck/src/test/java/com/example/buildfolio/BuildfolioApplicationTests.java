package com.example.buildfolio;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "jwt.secret=test-secret-key",
    "jwt.expiration=3600000"
})
class BuildfolioApplicationTests {

    @Test
    void contextLoads() {
    }
}