package com.service.user_service.services;

import com.service.user_service.dto.LoginDto;
import com.service.user_service.dto.TokenResponseDto;
import com.service.user_service.dto.UserDto;
import com.service.user_service.entities.User;
import com.service.user_service.exceptions.UserNotFoundException;
import com.service.user_service.repositories.UserRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepo userRepo;
    private final UserService userService;
    private final JwtService jwtService;
    private final JwtSessionService jwtSessionService;

    public AuthService(UserService userService, JwtService jwtService, JwtSessionService jwtSessionService, UserRepo userRepo){
        this.userService = userService;
        this.jwtService = jwtService;
        this.jwtSessionService = jwtSessionService;
        this.userRepo = userRepo;
    }

    //registration
    public TokenResponseDto registration(UserDto userDto, HttpServletResponse response){
        User user = userService.upgradeAnonymousToRegistered(userDto);

        return generateTokenAndCreateSession(user.getId(), user.getLogin(), null, response);//*
    }

    //login
    public TokenResponseDto login(LoginDto user, HttpServletResponse response){
        try {
            userService.validateUser(user);

            User searchedUser = userRepo.findByLogin(user.login())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            return generateTokenAndCreateSession(searchedUser.getId(), user.login(), null, response);//*
        }
        catch (BadCredentialsException | UsernameNotFoundException ex) {
            throw new BadCredentialsException("Invalid login or password");
        }
    }

    //logout from app
    public void logout(String token){
        jwtSessionService.deleteSession(token);
    }

    //create jwt session
    private TokenResponseDto generateTokenAndCreateSession(Long userId, String login, String device, HttpServletResponse response){
        String accessToken = jwtService.generateToken(login);
        String refreshToken = jwtService.generateRefreshToken(login);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7*24*60*60);
        response.addCookie(refreshTokenCookie);

        jwtSessionService.createSession(userId, accessToken, refreshToken, device);
        return new TokenResponseDto(accessToken, refreshToken);
    }
}
