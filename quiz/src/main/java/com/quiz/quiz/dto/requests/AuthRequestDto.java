package com.quiz.quiz.dto.requests;

import lombok.Data;

@Data
public class AuthRequestDto {
    private Long userId;
    private String login;
    private String password;
}
