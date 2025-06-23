package com.quiz.quiz.controllers;

import com.quiz.quiz.entities.formysql.QuizSession;
import com.quiz.quiz.services.QuizSessionService;
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

    //Get
    @GetMapping
    public ResponseEntity<List<QuizSession>> getAllQuizSession(){
        return new ResponseEntity<>(quizSessionService.getAllQuizSessions(), HttpStatus.OK);
    }
}
