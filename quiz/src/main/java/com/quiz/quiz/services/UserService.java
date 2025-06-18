package com.quiz.quiz.services;

import com.quiz.quiz.entities.User;
import com.quiz.quiz.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User addUser(User user){
        if(user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        return userRepo.save(user);
    }

    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    public void deleteUser(String id){
        if(!userRepo.existsById(id)){
            throw new RuntimeException("User not found");
        }
        userRepo.deleteById(id);
    }

    public User updateUser(User user){
        User target = userRepo.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        target.setLogin(user.getLogin());
        target.setPassword(user.getPassword());
        target.setRole(user.getRole());
        target.setUpdateAt(LocalDateTime.now());

        return userRepo.save(target);
    }
}
