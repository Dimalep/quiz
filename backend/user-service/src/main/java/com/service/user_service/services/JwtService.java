package com.service.user_service.services;

import com.service.user_service.dto.TokenResponseDto;
import com.service.user_service.repositories.JwtSessionRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

//here logic for tokens
@Service
public class JwtService {

    private final JwtSessionService jwtSessionService;

    private final SecretKey SECRET_KEY;
    private final long EXPIRATION;
    private final long REFRESH_TOKEN_EXPIRATION;

    public JwtService(@Value("${jwt.SECRET_KEY}") String SECRET_KEY
            ,@Value("${jwt.EXPIRATION}") long EXPIRATION
            ,@Value("${jwt.REFRESH_TOKEN_EXPIRATION}") long REFRESH_TOKEN_EXPIRATION
            ,JwtSessionService jwtSessionService)
    {
        this.EXPIRATION = EXPIRATION;
        this.SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        this.REFRESH_TOKEN_EXPIRATION = REFRESH_TOKEN_EXPIRATION;
        this.jwtSessionService = jwtSessionService;
    }

    public String generateToken(String login){
        return Jwts.builder()
                .setSubject(login)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(String login){
        return Jwts.builder()
                .setSubject(login)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getLoginFromRefreshToken(String refreshToken){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(refreshToken)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateRefreshToken(String refreshToken){
        try{
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(refreshToken)
                    .getBody();

            String login = claims.getSubject();

            return true;
        }
        catch (io.jsonwebtoken.ExpiredJwtException e){
            return false;
        }
        catch (io.jsonwebtoken.JwtException e){
            return  false;
        }
    }

    public TokenResponseDto refreshToken(String refreshToken){
        String newAccessToken = generateToken(getLoginFromRefreshToken(refreshToken));

        jwtSessionService.refreshSession(newAccessToken, refreshToken);
        return new TokenResponseDto(newAccessToken, refreshToken);
    }

}
