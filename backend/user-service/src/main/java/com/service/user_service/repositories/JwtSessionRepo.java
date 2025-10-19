package com.service.user_service.repositories;

import com.service.user_service.entities.JwtSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface JwtSessionRepo extends JpaRepository<JwtSession, Long> {
    Optional<JwtSession> findByAccessToken(String accessToken);
    Optional<JwtSession> findByRefreshToken(String refreshToken);

    @Modifying
    @Transactional
    @Query("DELETE FROM JwtSession j WHERE j.accessToken = :accessToken")
    void deleteByToken(@Param("accessToken") String accessToken);
    List<JwtSession> findAllByUserId(Long userId);
}
