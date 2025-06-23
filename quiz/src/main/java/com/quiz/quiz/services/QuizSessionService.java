package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.QuizSession;
import com.quiz.quiz.repositories.QuizSessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizSessionService {

    @Autowired
    private QuizSessionRepo quizSessionRepo;

    //CRUD
    public QuizSession addQuizSession(QuizSession quizSession){
        if(quizSession == null){
            throw new IllegalArgumentException("Quiz session cannot by null.");
        }

        return quizSessionRepo.save(quizSession);
    }

    public void deleteQuizSessionById(Long id){
        if(quizSessionRepo.existsById(id)){
            throw new RuntimeException("Quiz session not found.");
        }

        quizSessionRepo.deleteById(id);
    }

    //Get
    public List<QuizSession> getAllQuizSessions(){
        return quizSessionRepo.findAll();
    }
}
