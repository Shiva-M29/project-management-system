package com.shiva.pms.pms_backend.repository;

import com.shiva.pms.pms_backend.entity.Comment;
import com.shiva.pms.pms_backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    List<Comment> findByTicketIdOrderByCreatedAtAsc(Long ticketId);
    void deleteAllByTicket(Ticket ticket);
}
