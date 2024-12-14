
package com.mentoretalk.mentorProfileCompletion.mentorService;


import com.mentoretalk.model.User;
import com.mentoretalk.mentorProfileCompletion.dto.MentorProfileCompletionDTO;
import com.mentoretalk.mentorProfileCompletion.repository.mentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class mentorService {

    @Autowired
    private mentorRepository profileCompletionRepository;

    public void updateProfile(MentorProfileCompletionDTO profileDTO) {
        // Validate and map DTO to entity
        MentorProfile mentorProfile = new MentorProfile();
        mentorProfile.setExperience(profileDTO.getExperience());
        mentorProfile.setEducation(profileDTO.getEducation());
        mentorProfile.setSkills(profileDTO.getSkills());
        mentorProfile.setUsername(profileDTO.getUsername());
        mentorProfile.setBio(profileDTO.getBio());
        // Save profile in the database
        profileCompletionRepository.save(mentorProfile);
    }
}
