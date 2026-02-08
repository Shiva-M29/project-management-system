package com.shiva.pms.pms_backend.service;

import com.shiva.pms.pms_backend.DTO.CommentResponse;
import com.shiva.pms.pms_backend.DTO.CreateTicketRequest;
import com.shiva.pms.pms_backend.DTO.TicketResponse;
import com.shiva.pms.pms_backend.DTO.UpdateTicketRequest;
import com.shiva.pms.pms_backend.entity.Comment;
import com.shiva.pms.pms_backend.entity.Ticket;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.Role;
import com.shiva.pms.pms_backend.enums.TicketLabel;
import com.shiva.pms.pms_backend.enums.TicketStatus;
import com.shiva.pms.pms_backend.exception.TicketNotFoundException;
import com.shiva.pms.pms_backend.exception.UserNotFoundException;
import com.shiva.pms.pms_backend.exception.UsernameAlreadyExistsException;
import com.shiva.pms.pms_backend.repository.CommentRepository;
import com.shiva.pms.pms_backend.repository.TicketRepository;
import com.shiva.pms.pms_backend.repository.UserRepository;
import com.shiva.pms.pms_backend.security.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {
   private final TicketRepository ticketRepository;
   private final UserRepository userRepository;
   private final CommentRepository commentRepository;

//   public TicketService(TicketRepository ticketRepository,UserRepository userRepository,CommentRepository commentRepository)
//   {
//       this.ticketRepository=ticketRepository;
//       this.commentRepository=commentRepository;
//       this.userRepository=userRepository;
//
//   }

  public List<TicketResponse> getAllTickets()
   {
      List<Ticket> tickets=ticketRepository.findAll();

       List<TicketResponse> ticketResponseList=new ArrayList<>();
       for(Ticket ticket:tickets)
       {
          ticketResponseList.add(new TicketResponse(ticket.getId(),ticket.getTitle(),ticket.getDescription(),ticket.getStatus(),ticket.getLabel(),ticket.getAssignedTo(),ticket.getCreatedBy()));
       }

       return ticketResponseList;
   }
   public String createTicket(CreateTicketRequest request, CustomUserDetails userDetails)
   {


       User assignedUser=userRepository.findById(request.getAssignedToUserId()).orElseThrow(()->new UserNotFoundException("Assigned User not Found"));

       if (ticketRepository.existsByTitleAndLabelAndAssignedTo(
               request.getTitle(),
               request.getLabel(),
               assignedUser
       )) {
           throw new UsernameAlreadyExistsException(
                   "Ticket already exists for this user with same label"
           );
       }

       if (assignedUser.getRole() != Role.EMPLOYEE) {
           throw new ResponseStatusException(
                   HttpStatus.BAD_REQUEST,
                   "Ticket can be assigned only to employees"
           );

       }
       User createdUser=userDetails.getUser();
       if(createdUser.getRole()!=Role.ADMIN)
       {
           throw new ResponseStatusException(
                   HttpStatus.FORBIDDEN,
                   "You are not allowed to create  ticket"
           );
       }
       Ticket ticket=new Ticket();
       ticket.setTitle(request.getTitle());
       ticket.setDescription(request.getDescription());
       ticket.setLabel(request.getLabel());
       ticket.setStatus(TicketStatus.TODO);
       ticket.setCreatedBy(createdUser);
       ticket.setAssignedTo(assignedUser);

        ticketRepository.save(ticket);
        return "Ticket Created Successfully";

   }

    public List<Ticket> getMyTickets(CustomUserDetails userDetails)
    {
             User user=userDetails.getUser();
             return ticketRepository.findByAssignedToId(user.getId());
    }
    public TicketResponse getTicketById(Long id,User loggedInUser)
    {
       Ticket ticket= ticketRepository.findById(id).orElseThrow(()->new TicketNotFoundException("Ticket Not Found"));
        if (loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole()!=Role.EMPLOYEE) {
            throw new ResponseStatusException(
                  HttpStatus.FORBIDDEN,
                   "You are not allowed to update this ticket"
          );
        }


//        if (!ticket.getAssignedTo().getId().equals(loggedInUser.getId())) {
//            throw new ResponseStatusException(
//                    HttpStatus.FORBIDDEN,
//                    "You are not allowed to update this ticket"
//            );
//        }

        return new TicketResponse(ticket.getId(),ticket.getTitle(),ticket.getDescription(),ticket.getStatus(),ticket.getLabel(),ticket.getAssignedTo(),ticket.getCreatedBy());
    }


    public String setStatusOfTicket(Long id,TicketStatus newStatus, User user) {
      Ticket ticket=ticketRepository.findById(id).orElseThrow(()-> new TicketNotFoundException("Ticket Not Found"));
      if(user.getRole()==Role.ADMIN )
      {
          ticket.setStatus(newStatus);
      }
      else {

          if (!ticket.getAssignedTo().getId().equals(user.getId())) {
              throw new ResponseStatusException(
                      HttpStatus.FORBIDDEN,
                      "You are not allowed to update this ticket"
              );
          }

          if (newStatus == TicketStatus.READY_TO_DEPLOY
                  || newStatus == TicketStatus.DEPLOYED) {
              throw new ResponseStatusException(
                      HttpStatus.FORBIDDEN,
                      "You are not allowed to set this status"
              );
          }
      }

        ticket.setStatus(newStatus);
         ticketRepository.save(ticket);
         return "Ticket Status updated to "+newStatus;
    }




    public String deleteTicket(Long id,User user)
    {
        Ticket ticket=ticketRepository.findById(id).orElseThrow(()-> new TicketNotFoundException("Ticket Not Found"));
        if(user.getRole()!=Role.ADMIN )
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not allowed to delete this ticket"
            );


        ticketRepository.deleteById(ticket.getId());
        return "Ticket deleted";
    }

    public String updateTicket(
            Long ticketId,
            UpdateTicketRequest request,
            User user
    ) {

        if (user.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only admin can update ticket details"
            );
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket Not Found"));

        User assignedUser = userRepository.findById(request.getAssignedToUserId())
                .orElseThrow(() -> new UserNotFoundException("Assigned user not found"));

        if (assignedUser.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ticket can be assigned only to employees"
            );
        }

        if (ticketRepository.existsByTitleAndLabelAndAssignedTo(
                request.getTitle(),
                request.getLabel(),
                assignedUser
        )) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Ticket already exists for this user with same label"
            );
        }

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setLabel(request.getLabel());
        ticket.setAssignedTo(assignedUser);

        ticketRepository.save(ticket);

        return "Ticket updated successfully";
    }

}
