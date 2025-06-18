package com.quiz.quiz.entities;

import com.quiz.quiz.enums.Role;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String login;
    private String password;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Role role;
}
