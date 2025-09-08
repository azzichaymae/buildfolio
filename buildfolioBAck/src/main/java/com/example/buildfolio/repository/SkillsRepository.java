package com.example.buildfolio.repository;

import com.example.buildfolio.model.Skills;
import com.example.buildfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillsRepository extends JpaRepository<Skills, Long> {
    List<Skills> findByUser(User user);
}