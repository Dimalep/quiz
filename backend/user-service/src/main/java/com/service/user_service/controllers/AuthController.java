package com.service.user_service.controllers;

import com.service.user_service.dto.LoginDto;
import com.service.user_service.dto.TokenResponseDto;
import com.service.user_service.dto.UserDto;
import com.service.user_service.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/registration")
    public ResponseEntity<TokenResponseDto> registration(@Validated @RequestBody UserDto userDto, HttpServletResponse response){
        TokenResponseDto tokens = authService.registration(userDto, response);
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@Validated @RequestBody LoginDto user, HttpServletResponse response){
        return new ResponseEntity<TokenResponseDto>(authService.login(user, response), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Validated @RequestHeader("Authorization") String authHeader){
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String tokens = authHeader.substring(7);
        authService.logout(tokens);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
