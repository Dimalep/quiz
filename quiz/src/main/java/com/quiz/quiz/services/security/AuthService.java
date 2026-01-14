package com.quiz.quiz.services.security;

import com.quiz.quiz.dto.requests.AuthRequestDto;
import com.quiz.quiz.dto.responses.AuthResponseDto;
import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.repositories.UserRepo;
import com.quiz.quiz.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UserRepo userRepo;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepo userRepo, PasswordEncoder passwordEncoder, UserService userService, JwtService jwtService){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public String register(AuthRequestDto authRequest){
        //*********
//        if (userRepo.existsByLogin(authRequest.getLogin())) {
//            throw new RuntimeException("User with login '" + authRequest.getLogin() + "' already exists");
//        }

        User existUser = userRepo.findById(authRequest.getUserId()).orElseThrow(() ->
                new RuntimeException("User not found with ID '" + authRequest.getUserId() + "'"));

        existUser.setLogin(authRequest.getLogin());
        existUser.setIsRegistered(true);
        existUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        existUser.setUpdateAt(LocalDateTime.now());
        userService.updateUser(existUser);

        return jwtService.generateToken(existUser.getLogin());
    }

    public AuthResponseDto login(AuthRequestDto authRequest){
        AuthResponseDto authResponseDto = new AuthResponseDto();
        if(!userRepo.existsByLogin(authRequest.getLogin())){
            authResponseDto.setMessage("Not found user by login: " + authRequest.getLogin());
            authResponseDto.setToken("error");
            authResponseDto.setIsSuccess(false);
            return authResponseDto;
//          throw new RuntimeException("The user with this login:" + authRequest.getLogin() +" does not exist. ");
        }

        User user = userRepo.findByLogin(authRequest.getLogin())
                .orElseThrow( () -> new RuntimeException("Not found user by login: " + authRequest.getUserId()));

        if(!user.getPassword().equals(authRequest.getPassword())){
            authResponseDto.setMessage("Not correct password");
            authResponseDto.setToken("error");
            authResponseDto.setIsSuccess(false);
            return authResponseDto;
//          throw new IllegalArgumentException("Not correct password");
        }

        authResponseDto.setToken(jwtService.generateToken(authRequest.getLogin()));
        authResponseDto.setMessage("Successfully login. ");
        authResponseDto.setIsSuccess(true);

        return authResponseDto;
    }
}
