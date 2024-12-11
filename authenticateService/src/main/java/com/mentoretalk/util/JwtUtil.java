package com.mentoretalk.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final int EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    // Generate Token
    public static String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract Email from Token
    public String extractEmail(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getSubject(); // Extract the subject (email)
    }

    // Validate Token
    public boolean isTokenValid(String token) {
        try {
            getClaimsFromToken(token); // Parsing will throw an exception if invalid
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Parse Claims
    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
