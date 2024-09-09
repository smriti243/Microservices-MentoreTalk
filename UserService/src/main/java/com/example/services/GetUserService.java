package com.example.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.models.User;

@Service
public class GetUserService {

    private List<User> store = new ArrayList<>();

    public GetUserService() {
        store.add(new User(UUID.randomUUID().toString(), "Smriti Rai", "500096396@stu.upes.ac.in"));
        store.add(new User(UUID.randomUUID().toString(), "Kartikay Bisaria", "500096303@stu.upes.ac.in"));
        store.add(new User(UUID.randomUUID().toString(), "Rudra Pratap Singh Bohra", "500096590@stu.upes.ac.in"));
        store.add(new User(UUID.randomUUID().toString(), "Amartya Kumar", "500097356@stu.upes.ac.in"));
    }

    public List<User> getUsers() {
        return this.store;
    }

}
