package com.service.user_service.services;

import com.service.user_service.dto.LoginDto;
import com.service.user_service.dto.UserDto;
import com.service.user_service.entities.User;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthService(UserService userService, JwtService jwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public String registration(UserDto userDto){
        User newUser = userService.upgradeAnonymousToRegistered(userDto);
        return jwtService.generateToken(newUser.getLogin());
    }

    public String login(LoginDto user){
        try {
            userService.validateUser(user);
            return jwtService.generateToken(user.getLogin());
        } catch (BadCredentialsException | UsernameNotFoundException ex) {
            throw new BadCredentialsException("Invalid login or password");
        }
    }
}
