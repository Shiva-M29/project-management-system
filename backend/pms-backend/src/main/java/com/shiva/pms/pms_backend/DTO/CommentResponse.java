package com.shiva.pms.pms_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@Getter
@Setter
public class CommentResponse {
    Long id;
    String content;
    String author;
    LocalDateTime createdAt;


}

