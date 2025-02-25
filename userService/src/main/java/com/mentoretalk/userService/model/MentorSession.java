package com.mentoretalk.userService.model;
import java.util.Date;

import org.springframework.data.annotation.Id;

public class MentorSession
 {
    @Id
    private String id;

    private String title;

   
    private Date date;

    // Getters and Setters
}
