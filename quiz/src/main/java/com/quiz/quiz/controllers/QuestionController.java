package com.quiz.quiz.controllers;

import com.quiz.quiz.entities.formysql.Question;
import com.quiz.quiz.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    //CRUD
    @PostMapping("/create")
    public ResponseEntity<Question> addQuestion(@Validated @RequestBody Question question){
        Question addedQuestion = questionService.addQuestion(question);
        return new ResponseEntity<>(addedQuestion, HttpStatus.CREATED);
    }

    @PostMapping("/create-bulk")
    public ResponseEntity<Void> addArrayWithQuestions(@Validated @RequestBody List<Question> questions){
        List<Question> addedQuestions = questionService.addArrayWithQuestion(questions);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestionById(@PathVariable Long id){
        questionService.deleteQuestionById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Question> updateQuestion(@Validated @RequestBody Question question){
        Question updatedQuestion = questionService.updateQuestion(question);
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }

    //Get
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestion(){
        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id){
        Question existingQuestion = questionService.getQuestionById(id);
        return new ResponseEntity<>(existingQuestion, HttpStatus.OK);
    }

}
