package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.UserAnswer;
import com.quiz.quiz.repositories.UserAnswerRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnswersService {

    private UserAnswerRepo userAnswerRepo;

    //CRUD
    public UserAnswer addUserAnswer(UserAnswer answer){
        if(answer == null){
            throw new IllegalArgumentException("User answer cannot by null.");
        }
        return userAnswerRepo.save(answer);
    }

    public void deleteUserAnswerById(Long id){
        if(userAnswerRepo.existsById(id)){
            throw new RuntimeException("User answer not found.");
        }

        userAnswerRepo.deleteById(id);
    }

    public UserAnswer updateUserAnswer(UserAnswer userAnswer){
        UserAnswer target = userAnswerRepo.findById(userAnswer.getId())
                .orElseThrow(() -> new RuntimeException("User answer not found."));

        target.setAnswer(userAnswer.getAnswer());
        target.setTime(userAnswer.getTime());

        return userAnswerRepo.save(target);
    }

    //Get
    public List<UserAnswer> getAllUserAnswersById(Long id){
        return userAnswerRepo.findByUserId(id);
    }
}
