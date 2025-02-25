// package com.mentoretalk.mentorProfileCompletion.dto;

// import java.util.List;

// public class MentorProfileCompletionDTO {
//     private ExperienceDTO experience;
//     private EducationDTO education;
//     private List<String> skills;
//     private List<String> mentorSpecialty;
//     private String username;
//     private String bio;
//     private String teachingExperience;
//     private String currentCompany;
//     private List<String> previousCompanies;

//     // Getters and Setters
// }
package com.mentoretalk.mentorProfileCompletion.dto;

import java.util.List;

import com.mentoretalk.userService.model.Education;
import com.mentoretalk.userService.model.Experience;

public class MentorProfileCompletionDTO {
    private Experience experience;
    private Education education;
    private List<String> skills;
    private String username;
    private String bio;
    private List<String> mentorSpecialty;
    private String teachingExperience;
    private String currentCompany;
    private List<String> previousCompanies;

    public Experience getExperience() {
        return experience;
    }

    public Education getEducation() {
        return education;
    }

    public List<String> getSkills() {
        return skills;
    }

    public String getUsername() {
        return username;
    }

    public String getBio() {
        return bio;
    }
}
