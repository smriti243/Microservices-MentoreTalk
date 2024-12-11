package com.mentoretalk.controller;

import com.mentoretalk.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthServiceClient authServiceClient;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Delegate the login to the AuthService via REST API
            String token = authServiceClient.login(loginRequest);
            return ResponseEntity.ok("Login successful. Token: " + token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }
}

@Service
class AuthServiceClient {

    private final RestTemplate restTemplate;

    @Autowired
    public AuthServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String login(LoginRequest loginRequest) {
        String authServiceUrl = "http://localhost:8080/api/auth/login"; // Replace with actual URL
        ResponseEntity<String> response = restTemplate.postForEntity(authServiceUrl, loginRequest, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody(); // JWT Token returned by AuthService
        }
        throw new RuntimeException("Invalid email or password");
    }
}
