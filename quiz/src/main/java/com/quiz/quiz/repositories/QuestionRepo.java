package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question, Long> {
}
