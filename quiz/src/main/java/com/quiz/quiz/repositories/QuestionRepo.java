package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepo extends MongoRepository<Question, String> {
}
