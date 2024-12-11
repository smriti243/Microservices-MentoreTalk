package com.mentoretalk.eureka_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for simplicity (not recommended for production)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/eureka/**").permitAll() // Allow all requests to `/eureka/`
                .anyRequest().authenticated() // Authenticate other requests
            )
            .httpBasic(); // Enable basic authentication
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
                .username("admin")
                .password("{noop}admin123") // `{noop}` indicates no password encoding
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
 
    

