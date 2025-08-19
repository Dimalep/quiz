package com.quiz.quiz.dto.responses;

import com.quiz.quiz.entities.formysql.Question;
import lombok.Data;

import java.util.List;

@Data
public class QuizResponseDto {
    private String quizName;
    private String quizDescription;
    private int quizCount;
    private List<Question> questions;
}
