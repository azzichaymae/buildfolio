package com.example.buildfolio.repository;

import com.example.buildfolio.model.Projects;
import com.example.buildfolio.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectsRepository extends JpaRepository<Projects, Long> {
    List<Projects> findByUser(User user);
}