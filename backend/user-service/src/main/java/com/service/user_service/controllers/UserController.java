package com.service.user_service.controllers;

import com.service.user_service.dto.UserDto;
import com.service.user_service.entities.User;
import com.service.user_service.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    //Created anonymous user
    @PostMapping("/new_anonymous_user")
    public ResponseEntity<Long> addAnonymousUser(){
        return new ResponseEntity<Long>(userService.createAnonymousUser().getId(), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> update(@Validated @RequestBody UserDto userDto,@PathVariable Long id){
        return new ResponseEntity<User>(userService.update(userDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        userService.deleteById(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll(){
        return new ResponseEntity<List<User>>(userService.getAll(), HttpStatus.OK);
    }
}
