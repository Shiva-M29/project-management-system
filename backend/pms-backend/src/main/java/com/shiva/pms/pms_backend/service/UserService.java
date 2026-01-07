package com.shiva.pms.pms_backend.service;

import com.shiva.pms.pms_backend.DTO.*;
import com.shiva.pms.pms_backend.entity.Ticket;
import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.Role;
import com.shiva.pms.pms_backend.enums.UserStatus;
import com.shiva.pms.pms_backend.exception.EmailAlreadyExistsException;
import com.shiva.pms.pms_backend.exception.InvalidCredentialsException;
import com.shiva.pms.pms_backend.exception.UserNotFoundException;
import com.shiva.pms.pms_backend.exception.UsernameAlreadyExistsException;
import com.shiva.pms.pms_backend.repository.TicketRepository;
import com.shiva.pms.pms_backend.repository.UserRepository;
import com.shiva.pms.pms_backend.security.CustomUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final TicketRepository ticketRepository;

    public UserService(UserRepository userRepository,JwtService jwtService,TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.jwtService=jwtService;
        this.ticketRepository=ticketRepository;
    }

    public void register( RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

         String str=request.getRole();
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setStatus(UserStatus.PENDING);
        user.setDisplayPicture("default.png");
        if(str.equals("ADMIN"))
            user.setRole(Role.ADMIN);
        else
            user.setRole(Role.EMPLOYEE);

        userRepository.save(user);
    }


    public LoginResponse login( LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new InvalidCredentialsException("Invalid username"));
        if (!request.getPassword().equals(user.getPassword())) {
            throw new InvalidCredentialsException("password is incorrect");
        }
        if(user.getStatus()==UserStatus.REJECTED)
        {
            userRepository.deleteById(user.getId());
            throw new InvalidCredentialsException("Account Rejected");

        }
        if(user.getStatus()!=(UserStatus.APPROVED))
        {
            throw new InvalidCredentialsException("Waiting for Admin approval");
        }
        user.setTokenVersion(user.getTokenVersion() + 1);
        userRepository.save(user);
        UserDetails userDetails = new CustomUserDetails(user);
        String token=jwtService.generateToken(userDetails);

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );

        return new LoginResponse(token, userResponse);
    }
    public List<User> getAllUsers()
    {
         return userRepository.findAll();
    }
    public List<User> getEmployees()
    {
        List<User> users=userRepository.findByRoleAndStatus(Role.EMPLOYEE,UserStatus.APPROVED);
        if(users.isEmpty())
        {
            throw new UserNotFoundException("Employees not found to Assign");
        }
        return users;
    }
    public List<User> getAllPendingUsers(UserStatus userStatus)
    {

        List<User> pendingUsers=userRepository.findByStatus(userStatus);
        if(pendingUsers.isEmpty())
         throw new UserNotFoundException("No Users with status Pending");
        return pendingUsers;
    }

    public void approveUser(String username)
    {
        User user=userRepository.findByUsername(username).orElseThrow(()-> new UserNotFoundException("No User Found"));
        user.setStatus(UserStatus.APPROVED);
        userRepository.save(user);
    }

    public void rejectUser(String username)
    {
        User user=userRepository.findByUsername(username).orElseThrow(()-> new UserNotFoundException("No User Found"));
         user.setStatus(UserStatus.REJECTED);
         userRepository.save(user);
    }
     public UserProfileResponse getMyProfile(User user)
     {
         if (user.getStatus() != UserStatus.APPROVED) {
             throw new ResponseStatusException(
                     HttpStatus.FORBIDDEN,
                     "Account not approved"
             );
         }
           return new UserProfileResponse(user.getUsername(), user.getEmail(), user.getRole(),user.getStatus(), user.getBio(), user.getDisplayPicture());
     }

    public void updateProfileByAdmin(String username, ProfileUpdateRequest request) {
        User user=userRepository.findByUsername(username).orElseThrow(()-> new UserNotFoundException("No User Found"));

        if(request.getUsername()!=null ) {
            if(!userRepository.existsByUsername(request.getUsername()))
            user.setUsername(request.getUsername());
            else
                throw new ResponseStatusException(HttpStatus.CONFLICT,"Username not available");
        }
        if(request.getPassword()!=null)
            user.setPassword(request.getPassword());
        if(request.getBio()!=null)
            user.setBio(request.getBio());
        if(request.getDisplayPicture()!=null)
            user.setDisplayPicture(request.getDisplayPicture());
        userRepository.save(user);

    }
    public void updateProfile(User user, ProfileUpdateRequest request) {

        if(request.getUsername()!=null ) {
            if(!userRepository.existsByUsername(request.getUsername()))
                user.setUsername(request.getUsername());
            else
                throw new ResponseStatusException(HttpStatus.CONFLICT,"Username not available");
        }
        if(request.getPassword()!=null)
            user.setPassword(request.getPassword());
        if(request.getBio()!=null)
            user.setBio(request.getBio());
        if(request.getDisplayPicture()!=null)
            user.setDisplayPicture(request.getDisplayPicture());
        userRepository.save(user);

    }

    public UserProfileResponse getUserProfile(Long id)
    {
        User user=userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User Not Found"));
        return new UserProfileResponse(user.getUsername(), user.getEmail(), user.getRole(),user.getStatus(), user.getBio(), user.getDisplayPicture());

    }
  public void deleteuser(String username)
  {
      User user=userRepository.findByUsername(username).orElseThrow(()->new UserNotFoundException("User Not Found"));
      List<Ticket> tickets=ticketRepository.findByAssignedToId(user.getId());

      userRepository.delete(user);
  }







}
