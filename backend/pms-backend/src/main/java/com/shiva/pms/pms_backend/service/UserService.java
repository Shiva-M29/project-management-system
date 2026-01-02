package com.shiva.pms.pms_backend.service;

import com.shiva.pms.pms_backend.DTO.LoginRequest;
import com.shiva.pms.pms_backend.DTO.RegisterRequest;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.Role;
import com.shiva.pms.pms_backend.enums.UserStatus;
import com.shiva.pms.pms_backend.exception.EmailAlreadyExistsException;
import com.shiva.pms.pms_backend.exception.InvalidCredentialsException;
import com.shiva.pms.pms_backend.exception.UsernameAlreadyExistsException;
import com.shiva.pms.pms_backend.repository.UserRepository;
import com.shiva.pms.pms_backend.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService=jwtService;
    }

    public void register( RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

         String str=request.getRole();
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setStatus(UserStatus.PENDING);
        user.setDisplayPicture("default.png");
        if(str.equals("ADMIN"))
            user.setRole(Role.ADMIN);
        else
            user.setRole(Role.EMPLOYEE);

        userRepository.save(user);
    }


    public String login( LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new InvalidCredentialsException("Invalid username"));
        if (!request.getPassword().equals(user.getPassword())) {
            throw new InvalidCredentialsException("password is incorrect");
        }
        if(user.getStatus()!=(UserStatus.APPROVED))
        {
            throw new InvalidCredentialsException("Account not approved");
        }
        UserDetails userDetails = new CustomUserDetails(user);
        return jwtService.generateToken(userDetails);
    }

}
