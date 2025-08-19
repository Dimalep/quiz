package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.QuizSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizSessionRepo extends JpaRepository<QuizSession, Long> {
    Optional<QuizSession> findByToken(String token);
}
