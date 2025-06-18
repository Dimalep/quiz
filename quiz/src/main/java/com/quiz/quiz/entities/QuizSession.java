package com.quiz.quiz.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Document(collection = "quiz_sessions")
public class QuizSession {

    @Id
    private String id;
    private LocalDateTime createAt;
    private LocalDateTime finishAt;

    private String userId;
    private String quizId;
}
