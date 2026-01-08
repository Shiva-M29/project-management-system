package com.shiva.pms.pms_backend.DTO;


import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.TicketLabel;
import com.shiva.pms.pms_backend.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TicketResponse {

    private Long id;
    private String title;
    private String description;
    private TicketStatus status;
    private TicketLabel label;

    private User assignedTo;
    private User createdBy;

}
