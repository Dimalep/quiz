package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
}
