package com.mentoretalk.model;
import com.mentoretalk.model.enums.NotificationType;

import java.util.Date;

public class Notification {

    private String id;
    private String message;
    private NotificationType type;  // Change to NotificationType enum
    private User sender;
    private Boolean read = false;
    private Date createdAt = new Date();

    // Getters and Setters
}
