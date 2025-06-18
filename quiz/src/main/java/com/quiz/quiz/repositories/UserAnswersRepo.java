package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.UserAnswers;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserAnswersRepo extends MongoRepository<UserAnswers, String> {
}
