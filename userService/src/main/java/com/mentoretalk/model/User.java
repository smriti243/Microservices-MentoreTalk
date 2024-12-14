package com.mentoretalk.model;

import com.mentoretalk.model.enums.Role;
import com.mentoretalk.model.Education;
import com.mentoretalk.model.MentorSession;
import com.mentoretalk.model.enums.TeachingExperience;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Document(collection = "users") // MongoDB collection name
public class User {

    @Id
    private String id; // MongoDB's ID is typically a String

    private String username;
    private String email;
    private String password;

    private Role role; // Enum for mentor or student

    private String bio; // Mentor's bio

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

    private List<String> skills; // Mentor's skills

    private List<String> mentorSpecialty;

    private List<MentorSession> mentorSessions;

    // Connections and notifications
    @DBRef // Reference to other documents
    private List<User> connections;

    private List<Notification> notifications;

    private Date createdAt = new Date(); // Default to the current date

    // Profile completion flag
    private boolean isProfileComplete;

    // Constructors, getters, setters, etc.
    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Additional getters and setters for new fields
    public boolean getIsProfileComplete() {
        return isProfileComplete;
    }

    public void setIsProfileComplete(boolean isProfileComplete) {
        this.isProfileComplete = isProfileComplete;
    }

    // Add other getters and setters as necessary for new fields
}
