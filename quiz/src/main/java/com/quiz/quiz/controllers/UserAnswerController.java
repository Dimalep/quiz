package com.quiz.quiz.controllers;

import com.quiz.quiz.entities.formysql.UserAnswer;
import com.quiz.quiz.services.UserAnswersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user_answers")
public class UserAnswerController {

    @Autowired
    private UserAnswersService userAnswersService;

    //CRUD
    @PostMapping("/create")
    public ResponseEntity<UserAnswer> addUserAnswer(@Validated @RequestBody UserAnswer userAnswer){
        UserAnswer addedUserAnswers = userAnswersService.addUserAnswer(userAnswer);
        return new ResponseEntity<>(addedUserAnswers, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserAnswer(@PathVariable Long id){
        userAnswersService.deleteUserAnswerById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UserAnswer> updateUserAnswer(@Validated @RequestBody UserAnswer userAnswer){
        UserAnswer updatedUserAnswer =userAnswersService.updateUserAnswer(userAnswer);
        return new ResponseEntity<>(updatedUserAnswer, HttpStatus.OK);
    }

    //Get
    @GetMapping("/{id}")
    public ResponseEntity<List<UserAnswer>> getAllUserAnswer(@PathVariable Long id){
        return new ResponseEntity<>(userAnswersService.getAllUserAnswersById(id), HttpStatus.OK);
    }
}
