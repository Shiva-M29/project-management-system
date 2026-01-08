package com.shiva.pms.pms_backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {

    @NotBlank(message = "Comment cannot be empty")
    @Size(
            min = 3,
            max = 2000,
            message = "Comment must be between 3 and 2000 characters"
    )
    String content;
}

