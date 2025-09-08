package com.example.buildfolio.service;

import com.example.buildfolio.model.Projects;
import com.example.buildfolio.model.User;
import com.example.buildfolio.repository.ProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepository projectsRepository;

    public List<Projects> getProjectsByUser(User user) {
        return projectsRepository.findByUser(user);
    }

    public Projects createProject(String title, String description, Integer progress, User user) {
        Projects project = new Projects(title, description, user, progress);
        return projectsRepository.save(project);
    }

    // New method to update progress
    public Projects updateProjectProgress(Long projectId, Integer progress) {
        Projects project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        project.setProgress(progress);
        return projectsRepository.save(project);
    }

    // New method to delete a project
    public void deleteProject(Long projectId) {
        Projects project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        projectsRepository.delete(project);

    }
}    