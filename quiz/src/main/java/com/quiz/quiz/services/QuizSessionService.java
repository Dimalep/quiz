package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.Quiz;
import com.quiz.quiz.entities.formysql.QuizSession;
import com.quiz.quiz.entities.formysql.QuizSessionUser;
import com.quiz.quiz.entities.formysql.User;
import com.quiz.quiz.enums.Status;
import com.quiz.quiz.repositories.QuizSessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    public QuizSession createSessionWithToken(Quiz quiz, User user) {
        if (quiz == null) {
            throw new IllegalArgumentException("Quiz cannot be null.");
        }

        QuizSession session = new QuizSession();
        session.setQuiz(quiz);
        session.setUser(user); // user может быть null
        session.setToken(UUID.randomUUID().toString()); // генерируем уникальный токен
        session.setStartAt(LocalDateTime.now());
        session.setStatus(Status.CREATED);

        System.out.println("TOKEN: " + session.getToken());
        return quizSessionRepo.save(session);
    }

    public QuizSession getQuizSessionByToken(String token){
        return quizSessionRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Quiz not found by token: " + token));
    }

    public QuizSession getQuizSessionById(Long id){
        return quizSessionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz session not found by id: " + id));
    }
}
