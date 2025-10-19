package com.service.user_service.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="jwt_sessions")
public class JwtSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long Id;

    @Column(name = "token")
    private String accessToken;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;

    @Column(name = "device")
    private String device;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_expires_at")
    private LocalDateTime refreshExpiresAt;
}
