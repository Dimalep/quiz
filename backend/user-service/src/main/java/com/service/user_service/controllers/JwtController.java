package com.service.user_service.controllers;

import com.service.user_service.dto.TokenResponseDto;
import com.service.user_service.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/jwt")
public class JwtController {

    private final JwtService jwtService;

    public JwtController(JwtService jwtService){
        this.jwtService = jwtService;
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseDto> refreshToken(HttpServletResponse response, HttpServletRequest request){

        String refreshToken = null;
        if(request.getCookies() != null){
            for(Cookie cookie : request.getCookies()){
                if("refreshToken".equals(cookie.getName())){
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if(refreshToken == null || !jwtService.validateRefreshToken(refreshToken)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TokenResponseDto tokenResponseDto = jwtService.refreshToken(refreshToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenResponseDto.accessToken())
                .body(tokenResponseDto);
    }
}
