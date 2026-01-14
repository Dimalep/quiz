package com.quiz.quiz.dto.responses;

import lombok.Data;

@Data
public class AuthResponseDto {
    private Boolean isSuccess;
    private String message;
    private String token;
}
