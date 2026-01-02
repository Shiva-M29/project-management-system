package com.shiva.pms.pms_backend.controller;

import com.shiva.pms.pms_backend.DTO.LoginRequest;
import com.shiva.pms.pms_backend.DTO.RegisterRequest;
import com.shiva.pms.pms_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService)
    {
        this.userService=userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request)
    {
        userService.register(request);
        return ResponseEntity.ok("Registration successful. Await admin approval.");
    }

    @PostMapping("/login")
    ResponseEntity<String> login( @RequestBody LoginRequest request)
    {
        String str=userService.login(request);
        return ResponseEntity.ok(str);

    }
}
