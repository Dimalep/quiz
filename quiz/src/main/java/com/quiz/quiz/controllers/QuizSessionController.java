package com.quiz.quiz.controllers;

import com.quiz.quiz.entities.formysql.Quiz;
import com.quiz.quiz.entities.formysql.QuizSession;
import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.services.QuizService;
import com.quiz.quiz.services.QuizSessionService;
import com.quiz.quiz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/quiz_sessions")
public class QuizSessionController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private UserService userService;

    @Autowired
    private QuizSessionService quizSessionService;

    //CRUD
    @PostMapping("/create")
    public ResponseEntity<QuizSession> addQuizSession(@Validated @RequestBody QuizSession quizSession){
        QuizSession addedQuizSession = quizSessionService.addQuizSession(quizSession);
        return new ResponseEntity<>(addedQuizSession, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizSession(@PathVariable Long id){
        quizSessionService.deleteQuizSessionById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/create/{quizId}/{userId}")
    public QuizSession createSessionWithUser(@PathVariable Long quizId, @PathVariable Long userId) {
        Quiz quiz = quizService.getQuizById(quizId);
        User user = userService.getUserById(userId);

        return quizSessionService.createSessionWithToken(quiz, user);
    }


    @PostMapping("/create/{quizId}/anonymous")
    public QuizSession createSessionAnonymous(@PathVariable Long quizId) {
        Quiz quiz = quizService.getQuizById(quizId);
        return quizSessionService.createSessionWithToken(quiz, null);
    }


    //Get
    @GetMapping
    public ResponseEntity<List<QuizSession>> getAllQuizSession(){
        return new ResponseEntity<>(quizSessionService.getAllQuizSessions(), HttpStatus.OK);
    }
}
