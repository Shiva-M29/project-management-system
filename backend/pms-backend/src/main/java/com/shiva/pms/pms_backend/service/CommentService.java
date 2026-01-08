package com.shiva.pms.pms_backend.service;


import com.shiva.pms.pms_backend.DTO.CommentRequest;
import com.shiva.pms.pms_backend.entity.Comment;
import com.shiva.pms.pms_backend.DTO.CommentResponse;
import com.shiva.pms.pms_backend.entity.Ticket;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.Role;
import com.shiva.pms.pms_backend.exception.TicketNotFoundException;
import com.shiva.pms.pms_backend.repository.CommentRepository;
import com.shiva.pms.pms_backend.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    public CommentService(CommentRepository commentRepository,TicketRepository ticketRepository)
    {
        this.commentRepository=commentRepository;
        this.ticketRepository=ticketRepository;
    }


    public void addComment(Long ticketId, User user, CommentRequest request) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        boolean isAdmin = user.getRole() == Role.ADMIN;
        boolean isAssignedUser =
                ticket.getAssignedTo().getId().equals(user.getId());

        if (!isAdmin && !isAssignedUser) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not allowed to comment on this ticket"
            );
        }

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setTicket(ticket);
        comment.setAuthor(user);

        commentRepository.save(comment);
    }


    public List<CommentResponse> getComments(Long ticketId)
    {
        List<Comment> comments= commentRepository
        .findByTicketIdOrderByCreatedAtAsc(ticketId);
List<CommentResponse> commentResponseList=new ArrayList<>();
        for(Comment comment:comments)
        {
            commentResponseList.add(new CommentResponse(comment.getId(),comment.getContent(),comment.getAuthor().getUsername(),comment.getCreatedAt()));
        }

        return commentResponseList;
    }

}
