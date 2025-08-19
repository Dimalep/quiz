package com.quiz.quiz.controllers;

import com.quiz.quiz.dto.QuizSessionUserDto;
import com.quiz.quiz.entities.formysql.QuizSession;
import com.quiz.quiz.entities.formysql.QuizSessionUser;
import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.services.QuizSessionService;
import com.quiz.quiz.services.QuizSessionUserService;
import com.quiz.quiz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz_sessions_users")
public class QuizSessionUserController {

    @Autowired
    public QuizSessionUserService quizSessionUserService;

    @Autowired
    public QuizSessionService quizSessionService;

    @Autowired
    public UserService userService;

    @PostMapping("/add")
    public ResponseEntity<QuizSessionUser> addUserToQuizSession(@Validated @RequestBody QuizSessionUserDto quizSessionUserDto){

        User savedUser = userService.getUserById(quizSessionUserDto.getUserId());
        QuizSession savedQuizSession = quizSessionService.getQuizSessionById(quizSessionUserDto.getSessionId());

        QuizSessionUser createdQSU = new QuizSessionUser();
        createdQSU.setQuizSession(savedQuizSession);
        createdQSU.setUser(savedUser);

        QuizSessionUser savedQSU = quizSessionUserService.addUserToQuizSession(createdQSU);

        return new ResponseEntity<QuizSessionUser>(savedQSU, HttpStatus.CREATED);
    }
}
