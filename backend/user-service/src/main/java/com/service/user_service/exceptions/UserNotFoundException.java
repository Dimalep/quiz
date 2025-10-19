package com.service.user_service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends UsernameNotFoundException {

    public UserNotFoundException(){
        super("User not found");
    }

    public UserNotFoundException(String message){
        super(message);
    }
}
