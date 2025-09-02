package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.repositories.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.ES256);

    public JwtService(UserRepo userRepo, PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
    }

    public String generateToken(String login, String password){
        User usr = userRepo.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("User not found by login " + login + ". "));

        if (!passwordEncoder.matches(password, usr.getPassword())) {
            throw new RuntimeException("Неверный пароль");
        }

        return Jwts.builder()
                .setSubject(login)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(secretKey)
                .compact();
    }
}
