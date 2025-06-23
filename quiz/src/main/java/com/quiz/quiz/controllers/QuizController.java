package com.quiz.quiz.controllers;

import com.quiz.quiz.entities.formysql.Quiz;
import com.quiz.quiz.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    //CRUD
    @PostMapping("/create")
    public ResponseEntity<Quiz> addQuiz(@Validated @RequestBody Quiz quiz){
        Quiz addedQuiz = quizService.addQuiz(quiz);
        return new ResponseEntity<>(addedQuiz, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizById(@PathVariable Long id){
        quizService.deleteQuizById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Quiz> updateQuiz(@Validated @RequestBody Quiz quiz){
        Quiz updatedQuiz = quizService.updateQuiz(quiz);
        return new ResponseEntity<>(quizService.updateQuiz(quiz), HttpStatus.OK);
    }

    //Get
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes(){
        return new ResponseEntity<>(quizService.getAllQuizzes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id){
        Quiz existingQuiz = quizService.getQuizById(id);
        return new ResponseEntity<>(existingQuiz, HttpStatus.OK);
    }

}
