package com.quiz.quiz.controllers;

import com.quiz.quiz.services.AuthService;
import com.quiz.quiz.services.JwtService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    private AuthController(AuthService authService, JwtService jwtService){
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public String register(@Validated @RequestParam String login, @RequestParam String password){
        authService.register(login, password);
        return "Successful registration";
    }

    @PostMapping("/login")
    public String login(@Validated @RequestParam String login, @RequestParam String password){
        return jwtService.generateToken(login, password);
    }
}
