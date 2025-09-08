package com.example.buildfolio.controller;

import com.example.buildfolio.model.Projects;
import com.example.buildfolio.model.User;
import com.example.buildfolio.security.JwtUtil;
import com.example.buildfolio.service.ProjectsService;
import com.example.buildfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectsController {

    @Autowired
    private ProjectsService projectsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Projects>> getUserProjects(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }
        String token = authHeader.substring(7);
        Long userId = jwtUtil.getIdFromToken(token);

        User user = userService.findById(userId);
        List<Projects> projects = projectsService.getProjectsByUser(user);
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    public ResponseEntity<Projects> createProject(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Object> projectData) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }
        String token = authHeader.substring(7);
        Long userId = jwtUtil.getIdFromToken(token);

        User user = userService.findById(userId);

        String title = (String) projectData.get("title");
        String description = (String) projectData.get("description");
        Integer progress = projectData.get("progress") != null
                ? Integer.parseInt(projectData.get("progress").toString())
                : 0;

        if (progress < 0 || progress > 100) {
            throw new IllegalArgumentException("Progress must be between 0 and 100");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        Projects project = projectsService.createProject(title, description, progress, user);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectsService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}