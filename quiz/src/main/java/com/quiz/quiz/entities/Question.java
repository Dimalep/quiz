package com.quiz.quiz.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Document(collection = "questions")
public class Question {

    @Id
    private String id;
    private String question;
    private String description;
    private LocalDateTime time;
    private Map<String, String> answer;
    private String correctAnswerKey;
    private String quizId;
}
