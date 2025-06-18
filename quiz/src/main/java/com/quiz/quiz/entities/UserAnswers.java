package com.quiz.quiz.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "user_answers")
public class UserAnswers {

    @Id
    private String id;
    private String userAnswer;
    private Boolean isCorrect;
    private LocalDateTime time;

    private String quizSessionId;
    private String questionId;
}
