package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    //CRUD
    public User addUser(User user){
        if(user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }
        return userRepo.save(user);
    }

    public void deleteUserById(Long id){
        if(!userRepo.existsById(id)){
            throw new RuntimeException("User not found.");
        }
        userRepo.deleteById(id);
    }

    public User updateUser(User user){
        User target = userRepo.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found."));

        target.setLogin(user.getLogin());

        //*
        target.setPassword(user.getPassword());

        target.setRole(user.getRole());
        target.setUpdateAt(LocalDateTime.now());

        return userRepo.save(target);
    }

    //Get
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public User getUserById(Long id){
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found."));
    }
}
