package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.QuizSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizSessionRepo extends JpaRepository<QuizSession, Long> {
}
