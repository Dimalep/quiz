package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.repositories.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepo userRepo;
    private final UserService userService;
    private PasswordEncoder passwordEncoder;

    public AuthService(UserRepo userRepo, PasswordEncoder passwordEncoder, UserService userService){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    public void register(String login, String password){
        if(!userRepo.existsByLogin(login)){
            throw new RuntimeException("Not found user by login" + login + ". ");
        }

        userService.addUser(new User(login, passwordEncoder.encode(password)));
    }
}
