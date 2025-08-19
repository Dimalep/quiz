package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.QuizSessionUser;
import com.quiz.quiz.repositories.QuizSessionUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizSessionUserService {

    private final QuizSessionUserRepo quizSessionUserRepo;

    @Autowired
    public QuizSessionUserService(QuizSessionUserRepo quizSessionUserRepo) {
        this.quizSessionUserRepo = quizSessionUserRepo;
    }

    public QuizSessionUser addUserToQuizSession(QuizSessionUser quizSessionUser){
        return quizSessionUserRepo.save(quizSessionUser);
    }
}
