package com.mentoretalk.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    protected void configure(HttpSecurity http) throws Exception {
        http
        .authorizeRequests()  // Use `authorizeRequests()` instead of `authorizeHttpRequests()`
            .requestMatchers("/api/**").hasRole("USER")
            .anyRequest().authenticated();
        // Secure other endpoints
    }
}
