package com.example.buildfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g., "JavaScript", "HTML/CSS"

    @Column(nullable = true)
    private Integer proficiency; // Optional: 0-100 for skill level

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors
    public Skills() {}

    public Skills(String name, User user, Integer proficiency) {
        this.name = name;
        this.user = user;
        this.proficiency = proficiency != null ? proficiency : 0; // Default to 0 if null
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getProficiency() { return proficiency; }
    public void setProficiency(Integer proficiency) { this.proficiency = proficiency; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}