package com.shiva.pms.pms_backend.entity;

import com.shiva.pms.pms_backend.enums.TicketLabel;
import com.shiva.pms.pms_backend.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(
        name = "tickets"
)
@Getter
@Setter
public class Ticket {

        @Id
        @GeneratedValue (strategy=GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false)
        private String title;

        @Column(nullable = false, length = 2000)
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private TicketLabel label;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private TicketStatus status;

        @ManyToOne
        @JoinColumn(name = "created_by", nullable = false)
        private User createdBy;

        @ManyToOne
        @JoinColumn(name = "assigned_to", nullable = false)
        private User assignedTo;

        @OneToMany(
                mappedBy = "ticket",
                cascade = CascadeType.ALL,
                orphanRemoval = true
        )
        private List<Comment> comments = new ArrayList<>();



}
