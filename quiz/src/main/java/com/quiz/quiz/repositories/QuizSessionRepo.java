package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.QuizSession;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizSessionRepo extends MongoRepository<QuizSession, String> {
}
