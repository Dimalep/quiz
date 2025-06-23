package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepo extends JpaRepository<Quiz, Long> {
}
