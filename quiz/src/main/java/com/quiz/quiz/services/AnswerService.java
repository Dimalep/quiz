package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.Answer;
import com.quiz.quiz.repositories.AnswerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepo answerRepo;

    //CRUD
    public Answer addAnswer(Answer answer){
        if(answer == null){
            throw new IllegalArgumentException("Answer cannot by null.");
        }

        return answerRepo.save(answer);
    }

    public void deleteAnswerById(Long id){
        if(!answerRepo.existsById(id)){
            throw new NoSuchElementException("Answer with ID - " + id + "does not exist.");
        }

        answerRepo.deleteById(id);
    }

    public Answer updateAnswer(Answer answer){
        if(answer == null){
            throw new IllegalArgumentException("Answer cannot by null");
        }

        Answer target = answerRepo.findById(answer.getId())
                .orElseThrow(() -> new NoSuchElementException("Answer not found."));

        target.setQuestion(answer.getQuestion());
        target.setValue(answer.getValue());
        target.setIsCorrect(answer.getIsCorrect());

        return target;
    }

    //Get
    public List<Answer> getAllAnswersByQuestionId(Long id){
        return answerRepo.findAllByQuestionId(id);
    }
}
