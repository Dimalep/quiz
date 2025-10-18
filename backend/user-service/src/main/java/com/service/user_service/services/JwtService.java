package com.service.user_service.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey SECRET_KEY;
    private final long EXPIRATION;

    public JwtService(@Value("${jwt.SECRET_KEY}") String SECRET_KEY
            ,@Value("${jwt.EXPIRATION}") long EXPIRATION)
    {
        this.EXPIRATION = EXPIRATION;
        this.SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String login){
        return Jwts.builder()
                .setSubject(login)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

}
