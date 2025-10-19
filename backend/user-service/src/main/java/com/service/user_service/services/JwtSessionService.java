package com.service.user_service.services;

import com.service.user_service.entities.JwtSession;
import com.service.user_service.repositories.JwtSessionRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JwtSessionService {

    private final JwtSessionRepo jwtSessionRepo;

    public JwtSessionService(JwtSessionRepo jwtSessionRepo){
        this.jwtSessionRepo = jwtSessionRepo;
    }

    //create session
    public JwtSession createSession(Long userId, String accessToken, String refreshToken, String device){
        JwtSession jwtSession = new JwtSession();
        jwtSession.setCreateAt(LocalDateTime.now());
        jwtSession.setUserId(userId);
        jwtSession.setAccessToken(accessToken);
        jwtSession.setRefreshToken(refreshToken);
        jwtSession.setExpiresAt(LocalDateTime.now().plusSeconds(3600*24));
        return jwtSessionRepo.save(jwtSession);
    }

    //validate session
    public boolean isSessionValid(String token){
        Optional<JwtSession> sessionOpt = jwtSessionRepo.findByAccessToken(token);
        if(sessionOpt.isEmpty()) return false;
        JwtSession session = sessionOpt.get();
        return session.getExpiresAt().isAfter(LocalDateTime.now());
    }

    //delete session (logout)
    public void deleteSession(String token){
        jwtSessionRepo.deleteByToken(token);
    }

    //get all user session
    public List<JwtSession> getUserSession(Long userId){
        return jwtSessionRepo.findAllByUserId(userId);
    }

    //update last active
    public void refreshSession(String accessToken, String refreshToken){
        //*
        jwtSessionRepo.findByAccessToken(accessToken).ifPresent(session -> {
            session.setLastActiveAt(LocalDateTime.now());
            jwtSessionRepo.save(session);
        });

        JwtSession jwtSession = jwtSessionRepo.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Not found JWT session by refresh token"));

        jwtSession.setAccessToken(accessToken);
        jwtSession.setExpiresAt(LocalDateTime.now().plusSeconds(3600000));
        jwtSessionRepo.save(jwtSession);
    }
}
