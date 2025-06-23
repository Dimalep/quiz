package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepo extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByUserId(Long userId);
}
