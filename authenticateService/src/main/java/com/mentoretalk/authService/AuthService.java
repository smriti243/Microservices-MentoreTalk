package com.mentoretalk.authService;

import com.mentoretalk.model.User;
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
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // User Registration
    public void register(User user) throws Exception {
        // Check if the email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email is already registered!");
        }

        // Encrypt the user's password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        userRepository.save(user);
    }

    // User Login
    public String login(String email, String password) throws Exception {
        // Fetch user from the database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        // Validate the password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid email or password!");
        }

        // Generate and return a JWT token
        return jwtUtil.generateToken(user.getEmail());
    }

    // Token Validation
    public boolean validateToken(String token) {
        return jwtUtil.isTokenValid(token);
    }
}
