package com.example.buildfolio.service;

import com.example.buildfolio.model.Skills;
import com.example.buildfolio.model.User;
import com.example.buildfolio.repository.SkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillsService {

    @Autowired
    private SkillsRepository skillsRepository;

    public Skills addSkill(String name, User user, Integer proficiency) {
        Skills skill = new Skills(name, user, proficiency);
        return skillsRepository.save(skill);
    }

    public List<Skills> getSkillsByUser(User user) {
        return skillsRepository.findByUser(user);
    }
}