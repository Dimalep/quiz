package com.service.user_service.services;

import com.service.user_service.Role;
import com.service.user_service.dto.LoginDto;
import com.service.user_service.dto.UserDto;
import com.service.user_service.entities.User;
import com.service.user_service.repositories.UserRepo;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    //CRUD
    //*
    public User createAnonymousUser(){
        User anonymous = new User();
        anonymous.setRegistered(false);
        userRepo.save(anonymous);

        return anonymous;
    }

    //Upgrade anonymous to registered
    public User upgradeAnonymousToRegistered(UserDto userDto){
        if(userDto == null) throw new IllegalArgumentException("Argument 'user' cannot be null.");
        User user = userRepo.findById(userDto.id())
                .orElseThrow(() -> new RuntimeException("Cannot found anonymous"));
        if(userRepo.findByLogin(userDto.login()).isPresent())
            throw new IllegalArgumentException("User with login:" + userDto.login() + "already exists.");

        user.setRegistered(true);
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setLogin(userDto.login());
        user.setRole(Role.USER);
        user.setUpdateAt(LocalDateTime.now());
        userRepo.save(user);

        return user;
    }

    //***to be redone
    public User update(UserDto userDto, Long id){
        User user =  userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found user by id: '"+ id + "'."));
        user.setUpdateAt(LocalDateTime.now());
        user.setLogin(userDto.login());
        user.setPassword(userDto.password());
        userRepo.save(user);
        return user;
    }

    public void deleteById(Long id){
        if(id == null) throw new IllegalArgumentException("Argument 'id' cannot be null.");
        userRepo.deleteById(id);
    }

    //GET
    public List<User> getAll(){
        return userRepo.findAll();
    }

    public User getUserIdByLogin(String login){
        return userRepo.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Not found user with login: '"+ login + "'. "));
    }

    //more
    public boolean validateUser(LoginDto user){
        User existsUser = userRepo.findByLogin(user.login())
                .orElseThrow(() -> new UsernameNotFoundException("User with login '"+ user.toString() +"' not found."));

        if(!passwordEncoder.matches(user.password(), existsUser.getPassword()))
            throw new BadCredentialsException("Invalid password");

        return true;
    }
}
