package com.service.user_service.dto;

public record UserDto(
        Long id,
        String login,
        String password
){}
