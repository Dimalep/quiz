package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepo extends MongoRepository<Quiz, String> {
}
