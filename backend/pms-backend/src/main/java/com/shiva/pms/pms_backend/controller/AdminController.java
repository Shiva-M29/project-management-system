package com.shiva.pms.pms_backend.controller;


import com.shiva.pms.pms_backend.DTO.UserProfileResponse;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.UserStatus;
import com.shiva.pms.pms_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    private final UserService userService;
    public AdminController(UserService userService)
    {
        this.userService=userService;
    }

    @GetMapping("/pendingusers")
    public ResponseEntity<List<User>> getAllPendingUsers(@RequestParam UserStatus status)
    {
      List<User> users=userService.getAllPendingUsers(status);
      return  ResponseEntity.ok(users);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers()
    {
        List<User> users=userService.getAllUsers();
        return  ResponseEntity.ok(users);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<User>> getEmployees()
    {
        List<User> users=userService.getEmployees();
        return  ResponseEntity.ok(users);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable Long id)
    {
        return ResponseEntity.ok(userService.getUserProfile(id));
    }
    @PutMapping("/users/{username}/approve")
    public ResponseEntity<String> approveUser(@PathVariable String username)
    {
        userService.approveUser(username);
        return ResponseEntity.ok("Approved");
    }
    @PutMapping("/users/{username}/reject")
    public ResponseEntity<String>  rejectUser(@PathVariable String username)
    {
         userService.rejectUser(username);
         return ResponseEntity.ok("Rejected");
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username)
    {
        String suc=userService.deleteuser(username);
       return ResponseEntity.ok(suc);
    }
}
