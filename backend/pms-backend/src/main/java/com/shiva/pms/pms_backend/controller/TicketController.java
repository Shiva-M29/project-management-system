package com.shiva.pms.pms_backend.controller;

import com.shiva.pms.pms_backend.DTO.CreateTicketRequest;
import com.shiva.pms.pms_backend.DTO.TicketResponse;
import com.shiva.pms.pms_backend.DTO.UpdateTicketRequest;
import com.shiva.pms.pms_backend.entity.Ticket;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.TicketLabel;
import com.shiva.pms.pms_backend.enums.TicketStatus;
import com.shiva.pms.pms_backend.security.CustomUserDetails;
import com.shiva.pms.pms_backend.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;



    @GetMapping
    public ResponseEntity<List<TicketResponse>> getAllTickets(@RequestParam (required = false) TicketLabel ticketType,@RequestParam (required = false) TicketStatus ticketStatus)
    {
        List<TicketResponse> tickets=ticketService.getAllTickets(ticketType,ticketStatus);
        return ResponseEntity.ok(tickets);
    }

    @PostMapping
    public ResponseEntity<String> createTicket(
            @Valid @RequestBody CreateTicketRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createTicket(
                request,
                userDetails
        ));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Ticket>>  getMyTickets(@AuthenticationPrincipal CustomUserDetails userDetails)
    {
        return ResponseEntity.ok(ticketService.getMyTickets(userDetails));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable Long id,@AuthenticationPrincipal CustomUserDetails userDetails)
    {
        return ResponseEntity.ok(ticketService.getTicketById(id,userDetails.getUser()));
    }


    @PatchMapping("/{id}/status")
    public ResponseEntity<String> setStatusOfTicket(@PathVariable Long id, @RequestBody TicketStatus status, @AuthenticationPrincipal CustomUserDetails userDetails)
    {
        return ResponseEntity.ok(ticketService.setStatusOfTicket(id,status,userDetails.getUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id,@AuthenticationPrincipal CustomUserDetails userDetails)
    {
            return ResponseEntity.ok(ticketService.deleteTicket(id,userDetails.getUser()));
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTicket(
            @PathVariable Long id,
            @RequestBody @Valid UpdateTicketRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseEntity.ok(
                ticketService.updateTicket(
                        id,
                        request,
                        userDetails.getUser()
                )
        );
    }

    @GetMapping("/pr")
    public ResponseEntity<List<Ticket>> prTickets(@AuthenticationPrincipal CustomUserDetails userDetails)
    {
        return ResponseEntity.ok(ticketService.prTickets(userDetails));
    }



}
