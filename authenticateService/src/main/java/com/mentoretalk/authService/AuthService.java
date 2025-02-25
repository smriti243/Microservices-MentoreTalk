package com.mentoretalk.authService;

import java.util.Arrays;
import com.mentoretalk.userService.model.User;
import com.mentoretalk.repository.UserRepository;
import com.mentoretalk.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;  // No need to change this as we still need to inject it for validation

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // User Registration
    public String register(User user) throws Exception {
        // Check if the user already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email is already registered!");
        }

        // Save the new user to the database
       // user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // You can do any other setup here (like sending a welcome email, etc.)

        return "User registered successfully!";
    }

    public String login(String email, String password) throws Exception {
        var trimmedEmail = email.trim();
        User user = userRepository.findByEmail(trimmedEmail).orElseThrow(() -> new Exception("User not found"));
    
        // Validate the password (Do not encode the entered password again)
       

        System.out.println("User password from DB: " + user.getPassword() + " " + Arrays.toString(user.getPassword().getBytes()));
        System.out.println("Entered password: " + password + " " + Arrays.toString(password.getBytes()));
        

// Directly check the entered password against the encoded password in the DB
boolean isMatch = false;
if (password.trim().equals(user.getPassword().trim())){
    isMatch = true;
}
System.out.println("Password match result: " + isMatch);

    
        if (!isMatch) {
            throw new Exception("Invalid credentials");
        }
    
        // Generate the JWT token for the user
        return JwtUtil.generateToken(user.getEmail());  // Static method call
    }
    

        

    // Token Validation
    public boolean validateToken(String token) {
        return jwtUtil.isTokenValid(token);  // Instance method call
    }
}
