package com.service.user_service.controllers;

import com.service.user_service.dto.LoginDto;
import com.service.user_service.dto.UserDto;
import com.service.user_service.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/users")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/registration")
    public ResponseEntity<String> registration(@Validated @RequestBody UserDto userDto){
        String token = authService.registration(userDto);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Validated @RequestBody LoginDto user){
        return new ResponseEntity<String>(authService.login(user), HttpStatus.OK);
    }
}
