package com.quiz.quiz.controllers;

import com.quiz.quiz.dto.requests.AuthRequestDto;
import com.quiz.quiz.dto.responses.AuthResponseDto;
import com.quiz.quiz.services.security.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Validated @RequestBody AuthRequestDto authRequest){
        String token = authService.register(authRequest);
        AuthResponseDto authResponse = new AuthResponseDto();
        authResponse.setMessage("Successfully registration. ");
        authResponse.setToken(token);
        return new ResponseEntity<AuthResponseDto>(authResponse ,HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Validated @RequestBody AuthRequestDto authRequest){
        return new ResponseEntity<AuthResponseDto>(authService.login(authRequest), HttpStatus.OK);
    }
}
