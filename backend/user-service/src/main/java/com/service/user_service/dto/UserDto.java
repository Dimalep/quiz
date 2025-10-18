package com.service.user_service.dto;

import com.service.user_service.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String login;
    private String password;
}
