package com.shiva.pms.pms_backend.repository;

import com.shiva.pms.pms_backend.entity.Ticket;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.TicketLabel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
    List<Ticket> findByCreatedById(Long userId);
    List<Ticket> findByAssignedToId(Long userId);
    boolean existsByTitleAndLabelAndAssignedTo(
            String title,
            TicketLabel label,
            User assignedTo
    );


}
