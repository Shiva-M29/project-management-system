package com.shiva.pms.pms_backend.DTO;

import com.shiva.pms.pms_backend.enums.Role;
import com.shiva.pms.pms_backend.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserProfileResponse {
    private String username;
    private String email;
    private Role role;
    private UserStatus status;
    private String bio;
    private String displayPicture;
}
