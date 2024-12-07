package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;

@Document(collection = "users") // MongoDB collection name
public class User {

    @Id
    private String id; // MongoDB's ID is typically a String

    private String username;
    private String email;
    private String password;

    private Role role; // Enum for mentor or student

    private String bio;

    private String profilePicture; // URL for profile picture

    // Education details
    private Education education;

    // Experience details
    private Experience experience;

    private TeachingExperience teachingExperience; // Enum for teaching experience

    private String academicInstitution; // For professors only

    private String currentCompany;

    private String otherCompany; // For "Other" company

    private List<String> previousCompanies;

    private List<String> skills;

    private List<String> mentorSpecialty;

    private List<MentorSession> mentorSessions;

    // Connections and notifications
    @DBRef // Reference to other documents
    private List<User> connections;

    private List<Notification> notifications;

    private Date createdAt = new Date(); // Default to the current date

    // Constructors, getters, setters, etc.
    public User() {}

    // Add any custom methods here (e.g., hashing password)
}
