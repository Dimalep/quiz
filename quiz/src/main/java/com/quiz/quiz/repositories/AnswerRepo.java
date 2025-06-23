package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer, Long> {

    public List<Answer> findAllByQuestionId(Long questionId);
}
