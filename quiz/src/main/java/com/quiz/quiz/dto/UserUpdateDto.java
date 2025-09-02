package com.quiz.quiz.dto;

import com.quiz.quiz.enums.Role;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserUpdateDto {
    private Long id;
    private String login;
    private String password;
    private Role role;
    private LocalDateTime updateAt = LocalDateTime.now();
}
