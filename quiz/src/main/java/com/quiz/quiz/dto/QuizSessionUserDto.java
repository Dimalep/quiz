package com.quiz.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuizSessionUserDto {
    private Long sessionId;
    private Long userId;
}
