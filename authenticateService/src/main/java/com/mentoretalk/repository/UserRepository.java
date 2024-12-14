package com.mentoretalk.repository;

import com.mentoretalk.model.User;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{'email': {$regex: ?0, $options: 'i'}}")
    Optional<User> findByEmail(String email);

    // Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
