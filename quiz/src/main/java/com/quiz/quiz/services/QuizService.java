package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.Quiz;
import com.quiz.quiz.repositories.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class QuizService {

    @Autowired
    private QuizRepo quizRepo;

    //CRUD
    public Quiz addQuiz(Quiz quiz){
        if(quiz == null){
            throw new IllegalArgumentException("Quiz cannot by null.");
        }

        return quizRepo.save(quiz);
    }

    public void deleteQuizById(Long id){
        if(!quizRepo.existsById(id)){
            throw new RuntimeException("Quiz not found.");
        }
        quizRepo.deleteById(id);
    }

    public Quiz updateQuiz(Quiz quiz){
        Quiz target = quizRepo.findById(quiz.getId())
                .orElseThrow(() -> new RuntimeException("Quiz not found."));

        target.setTitle(quiz.getTitle());
        target.setDescription(quiz.getDescription());
        target.setTime(quiz.getTime());
        target.setCreateAt(quiz.getCreateAt());

        return quizRepo.save(target);
    }

    //Get
    public List<Quiz> getAllQuizzes(){
        return quizRepo.findAll();
    }

    public Quiz getQuizById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Quiz ID cannot be null.");
        }

        return quizRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Quiz with ID " + id + " not found."));
    }
}
