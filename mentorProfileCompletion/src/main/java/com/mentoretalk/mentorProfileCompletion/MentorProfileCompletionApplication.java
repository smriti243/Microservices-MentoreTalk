package com.mentoretalk.mentorProfileCompletion;  // Change to your actual package name

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.mentoretalk", "com.mentoretalk.userService"})

public class MentorProfileCompletionApplication {

    public static void main(String[] args) {

		System.out.println(System.getProperty("java.class.path"));
        SpringApplication.run(MentorProfileCompletionApplication.class, args);
    }
}
