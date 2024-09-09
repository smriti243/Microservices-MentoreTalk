package com.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.User;
import com.example.services.GetUserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private GetUserService getUserService;

    //http://localhost:8081/home/users

    @GetMapping("/users")
    public List<User> getUser() {
        System.out.println("getting Users");
        return this.getUserService.getUsers();
    }
    
   
}
