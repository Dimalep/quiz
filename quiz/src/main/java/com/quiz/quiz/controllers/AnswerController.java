package com.quiz.quiz.controllers;

import com.quiz.quiz.entities.formysql.Answer;
import com.quiz.quiz.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    //CRUD
    @PostMapping("/create")
    public ResponseEntity<Answer> addAnswer(@Validated @RequestBody Answer answer){
        Answer addedAnswer = answerService.addAnswer(answer);
        return new ResponseEntity<>(addedAnswer, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id){
        answerService.deleteAnswerById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Answer> updateAnswer(@Validated @RequestBody Answer answer){
        Answer updatedAnswer = answerService.updateAnswer(answer);
        return new ResponseEntity<>(updatedAnswer, HttpStatus.OK);
    }

    //Get
    @GetMapping("/{question_id}")
    public ResponseEntity<List<Answer>> getAllAnswerByQuestionId(@PathVariable Long id){
        return new ResponseEntity<>(answerService.getAllAnswersByQuestionId(id), HttpStatus.OK);
    }
}
