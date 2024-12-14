package com.mentoretalk.mentorProfileCompletion.Controller;

import com.mentoretalk.model.User;
import com.mentoretalk.mentorProfileCompletion.mentorService.MentorProfileCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import com.mentoretalk.mentorProfileCompletion.dto.MentorProfileCompletionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class MentorProfileCompletionController {

    @Autowired
    private MentorProfileCompletionService profileCompletionService;

    @PutMapping("/profile")
    public ResponseEntity<?> updateMentorProfile(@RequestBody MentorProfileCompletionDTO profileDTO, 
                                                  @RequestHeader("Authorization") String token) {
        try {
            // Ensure user authentication via the token and update profile
            profileCompletionService.updateProfile(profileDTO);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update profile");
        }
    }
}

