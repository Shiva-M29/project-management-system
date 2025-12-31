package com.shiva.pms.pms_backend.service;

import com.shiva.pms.pms_backend.DTO.RegisterRequest;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.Role;
import com.shiva.pms.pms_backend.enums.UserStatus;
import com.shiva.pms.pms_backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void register( RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // later encrypt
        user.setRole(Role.EMPLOYEE);
        user.setStatus(UserStatus.PENDING);
        user.setDisplayPicture("default.png");

        userRepository.save(user);
    }



}
