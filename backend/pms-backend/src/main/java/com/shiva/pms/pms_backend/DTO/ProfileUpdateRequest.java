package com.shiva.pms.pms_backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {
    private String password;
    private String username;
    private String bio;
    private String displayPicture;
}
