package com.service.user_service.dto;

public record TokenResponseDto(
        String accessToken,
        String refreshToken
) {}
