package com.quiz.quiz.entities.formysql;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "answers")
@Data
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;

    @Column(name = "is_correct")
    private Boolean isCorrect = false;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
