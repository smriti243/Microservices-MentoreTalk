package com.mentoretalk.controller;

import com.mentoretalk.dto.AuthRequest;
import com.mentoretalk.model.User;
import com.mentoretalk.authService.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // User Registration Endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Register the user
            authService.register(user);

            // Generate token after successful registration
            String token = authService.login(user.getEmail(), user.getPassword());

            // Return the token
            return ResponseEntity.ok().body("Bearer " + token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // User Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // Authenticate user and generate token
            String token = authService.login(request.getEmail(), request.getPassword());

            return ResponseEntity.ok().body("Bearer " + token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: " + e.getMessage());
        }
    }

    // Token Validation Endpoint
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            // Validate the token (remove "Bearer " prefix)
            boolean isValid = authService.validateToken(token.substring(7));

            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }
}
