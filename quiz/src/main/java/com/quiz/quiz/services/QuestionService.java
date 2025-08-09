package com.quiz.quiz.services;

import com.quiz.quiz.entities.formysql.Question;
import com.quiz.quiz.entities.formysql.Quiz;
import com.quiz.quiz.repositories.QuestionRepo;
import com.quiz.quiz.repositories.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private QuizRepo quizRepo;

    //CRUD
    public Question addQuestion(Question question){
        if(question == null){
            throw new IllegalArgumentException("Question cannot by null.");
        }
        return questionRepo.save(question);
    }

    public void deleteQuestionById(Long id){
        if(!questionRepo.existsById(id)){
            throw new RuntimeException("Question not found.");
        }
        questionRepo.deleteById(id);
    }

    public Question updateQuestion(Question question){
        Question target = questionRepo.findById(question.getId())
                .orElseThrow(() -> new RuntimeException("Question not found."));

        target.setValue(question.getValue());
        target.setDescription(question.getDescription());
        target.setTime(question.getTime());
        target.setAnswers(question.getAnswers());

        return questionRepo.save(target);
    }

    public List<Question> addArrayWithQuestion(List<Question> questions) {
//        for(Question q : questions){
//            if(q.getQuiz() != null && q.getQuiz().getId() != null){
//                Quiz quiz = quizRepo.findById(q.getQuiz().getId())
//                        .orElseThrow(() -> new RuntimeException("Quiz not found"));
//                q.setQuiz(quiz);
//            }
//        }
        return questionRepo.saveAll(questions);
    }


    //Get
    public List<Question> getAllQuestions(){
        return questionRepo.findAll();
    }

    public Question getQuestionById(Long id){
        if(id == null){
            throw new IllegalArgumentException("Id cannot by null.");
        }

        return questionRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Question with ID - " + id + "not exists."));
    }
}
