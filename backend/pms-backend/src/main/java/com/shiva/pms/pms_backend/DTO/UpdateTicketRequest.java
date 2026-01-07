package com.shiva.pms.pms_backend.DTO;

import com.shiva.pms.pms_backend.enums.TicketLabel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTicketRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private TicketLabel label;

    @NotNull
    private Long assignedToUserId;
}
