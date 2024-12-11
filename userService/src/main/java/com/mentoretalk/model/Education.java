package com.mentoretalk.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Education {
    private String level; // Bachelor’s, Master’s, etc.
    private String fieldOfStudy;
    private String institution;
    private String graduationYear;
    private String otherInstitution; // For "Other"
    
    // Getters and Setters
}
