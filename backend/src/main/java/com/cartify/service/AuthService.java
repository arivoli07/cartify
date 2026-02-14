package com.cartify.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cartify.config.JwtUtil;
import com.cartify.dto.LoginRequest;
import com.cartify.dto.RegisterRequest;
import com.cartify.entity.User;
import com.cartify.repository.UserRepository;


@Service
public class AuthService {
   

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER
    public void register(RegisterRequest request) {

        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new RuntimeException("Username is required");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);
    }

    // LOGIN
    public String login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        // ✅ PASSWORD MATCH
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // ✅ GENERATE JWT
        return jwtUtil.generateToken(user.getEmail());
    }
}
