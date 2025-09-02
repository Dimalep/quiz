package com.quiz.quiz.entities.formysql;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="quiz_sessions_users")
public class QuizSessionUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    private QuizSession quizSession;

    @ManyToOne()
    private User user;
}
