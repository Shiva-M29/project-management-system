package com.shiva.pms.pms_backend.controller;


import com.shiva.pms.pms_backend.DTO.CommentRequest;
import com.shiva.pms.pms_backend.DTO.CommentResponse;
import com.shiva.pms.pms_backend.security.CustomUserDetails;
import com.shiva.pms.pms_backend.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {


        private final CommentService commentService;
        public CommentController(CommentService commentService)
        {
            this.commentService=commentService;
        }

        @PostMapping("/{ticketId}")
        public ResponseEntity<String> addComment(
                @PathVariable Long ticketId,
                @RequestBody CommentRequest request,
                @AuthenticationPrincipal CustomUserDetails userDetails
        ) {
            commentService.addComment(ticketId, userDetails.getUser(), request);
            return ResponseEntity.ok("Comment added");
        }

        @GetMapping("/{ticketId}")
        public List<CommentResponse> getComments(@PathVariable Long ticketId) {
            return commentService.getComments(ticketId);
        }


}
