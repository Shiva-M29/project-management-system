package com.shiva.pms.pms_backend.controller;
import com.shiva.pms.pms_backend.DTO.ProfileUpdateRequest;
import com.shiva.pms.pms_backend.DTO.UserProfileResponse;
import com.shiva.pms.pms_backend.security.CustomUserDetails;
import com.shiva.pms.pms_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(userService.getMyProfile(userDetails.getUser()));
    }

@PatchMapping
public ResponseEntity<String> updateProfile(
        @RequestBody ProfileUpdateRequest request,
        @AuthenticationPrincipal CustomUserDetails userDetails

) {
    userService.updateProfile(userDetails.getUser(), request);
    return ResponseEntity.ok("Profile updated successfully");
}

    @PatchMapping("/adminupdate/{username}")
    public ResponseEntity<String> updateProfile(
            @RequestBody ProfileUpdateRequest request,
            @PathVariable String username

    ) {
        userService.updateProfileByAdmin(username, request);
        return ResponseEntity.ok("Profile updated successfully");
    }




}

