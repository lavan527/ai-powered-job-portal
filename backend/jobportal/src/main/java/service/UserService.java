package com.jobportal.service;

import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (existingUser != null) {
            throw new RuntimeException("Email already exists");
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User loginUser(String email, String password, String role) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null &&
            user.getPassword().equals(password) &&
            user.getRole().equalsIgnoreCase(role)) {
            return user;
        }

        return null;
    }
}