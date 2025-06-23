package com.quiz.quiz.repositories;

import com.quiz.quiz.entities.formysql.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
}
