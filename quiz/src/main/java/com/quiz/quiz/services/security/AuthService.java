package com.quiz.quiz.services;

import com.quiz.quiz.models.request.AuthRequest;
import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.repositories.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UserRepo userRepo;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepo userRepo, PasswordEncoder passwordEncoder, UserService userService){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    public void register(AuthRequest authRequest){
        if (userRepo.existsByLogin(authRequest.getLogin())) {
            throw new RuntimeException("User with login '" + authRequest.getLogin() + "' already exists");
        }

        User existUser = userRepo.findById(authRequest.getUserId()).orElseThrow(() ->
                new RuntimeException("User not found with ID '" + authRequest.getUserId() + "'"));

        existUser.setLogin(authRequest.getLogin());
        existUser.setIsRegistered(true);
        existUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        existUser.setUpdateAt(LocalDateTime.now());
        userService.updateUser(existUser);

        //userService.addUser(new User(authRequest.getLogin(), passwordEncoder.encode(authRequest.getPassword())));
    }
}
