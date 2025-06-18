package com.quiz.quiz.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "quizzes")
public class Quiz {

    @Id
    private String id;
    private String title;
    private String description;
    private LocalDateTime createAt;
    private LocalDateTime time;
    private LocalDateTime finishAt;

    private String userId;
}
