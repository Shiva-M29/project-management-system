package com.shiva.pms.pms_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ticket_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ticket ticket;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    private User author;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


}
