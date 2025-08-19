package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.QuizSessionUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizSessionUserRepo extends JpaRepository<QuizSessionUser, Long> {
}
