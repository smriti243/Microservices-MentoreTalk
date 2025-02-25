package com.mentoretalk.userService.model;

import com.mentoretalk.userService.model.enums.Role;
import com.mentoretalk.userService.model.enums.TeachingExperience;
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

    // Constructors
    public User() {
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public Experience getExperience() {
        return experience;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public TeachingExperience getTeachingExperience() {
        return teachingExperience;
    }

    public void setTeachingExperience(TeachingExperience teachingExperience) {
        this.teachingExperience = teachingExperience;
    }

    public String getAcademicInstitution() {
        return academicInstitution;
    }

    public void setAcademicInstitution(String academicInstitution) {
        this.academicInstitution = academicInstitution;
    }

    public String getCurrentCompany() {
        return currentCompany;
    }

    public void setCurrentCompany(String currentCompany) {
        this.currentCompany = currentCompany;
    }

    public String getOtherCompany() {
        return otherCompany;
    }

    public void setOtherCompany(String otherCompany) {
        this.otherCompany = otherCompany;
    }

    public List<String> getPreviousCompanies() {
        return previousCompanies;
    }

    public void setPreviousCompanies(List<String> previousCompanies) {
        this.previousCompanies = previousCompanies;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getMentorSpecialty() {
        return mentorSpecialty;
    }

    public void setMentorSpecialty(List<String> mentorSpecialty) {
        this.mentorSpecialty = mentorSpecialty;
    }

    public List<MentorSession> getMentorSessions() {
        return mentorSessions;
    }

    public void setMentorSessions(List<MentorSession> mentorSessions) {
        this.mentorSessions = mentorSessions;
    }

    public List<User> getConnections() {
        return connections;
    }

    public void setConnections(List<User> connections) {
        this.connections = connections;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isProfileComplete() {
        return isProfileComplete;
    }

    public void setProfileComplete(boolean profileComplete) {
        isProfileComplete = profileComplete;
    }
}
