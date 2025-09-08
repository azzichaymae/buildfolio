// package com.example.buildfolio.service;

// import com.example.buildfolio.dto.RegisterRequest;
// import com.example.buildfolio.model.User;
// import com.example.buildfolio.repository.UserRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class UserService {
//     private final UserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//     public User registerUser(RegisterRequest request) {
//         if (userRepository.findByUsername(request.getUsername()).isPresent() ||
//             userRepository.findByEmail(request.getEmail()).isPresent()) {
//             throw new RuntimeException("Username or email already exists");
//         }

//         User user = new User();
//         user.setUsername(request.getUsername());
//         user.setEmail(request.getEmail());
//         user.setPassword(passwordEncoder.encode(request.getPassword()));
//         return userRepository.save(user);
//     }
// }


package com.example.buildfolio.service;

import com.example.buildfolio.dto.RegisterRequest;
import com.example.buildfolio.model.User;
import com.example.buildfolio.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent() ||
            userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Username or email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
    }
}