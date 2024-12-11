package com.mentoretalk.repository;

import com.mentoretalk.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // Add custom queries if required
    User findByEmail(String email);
}
