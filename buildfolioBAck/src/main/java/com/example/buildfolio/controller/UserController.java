package com.example.buildfolio.controller;

import com.example.buildfolio.model.Skills;
import com.example.buildfolio.model.User;
import com.example.buildfolio.security.JwtUtil;
import com.example.buildfolio.service.SkillsService;
import com.example.buildfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SkillsService skillsService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/skills")
    public ResponseEntity<List<Skills>> getUserSkills(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }
        String token = authHeader.substring(7);
        Long userId = jwtUtil.getIdFromToken(token);

        User user = userService.findById(userId);
        List<Skills> skills = skillsService.getSkillsByUser(user);
        return ResponseEntity.ok(skills);
    }

    @PostMapping("/skills")
    public ResponseEntity<List<Skills>> addSkills(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody List<Skills> skills) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing Authorization header");
        }
        String token = authHeader.substring(7);
        Long userId = jwtUtil.getIdFromToken(token);

        User user = userService.findById(userId);

        List<Skills> savedSkills = skills.stream()
                .map(skill -> {
                    skill.setUser(user);
                    return skillsService.addSkill(skill.getName(), user, skill.getProficiency());
                })
                .toList();

        return ResponseEntity.ok(savedSkills);
    }
}