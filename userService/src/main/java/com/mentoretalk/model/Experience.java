package com.mentoretalk.model;
import java.util.Date;
import jakarta.persistence.Embeddable;

@Embeddable
public class Experience {
    private String company;
    private String jobTitle;
    private Date startDate;
    private Date endDate;
    private String responsibilities;

    // Constructors, getters, setters, etc.
}
