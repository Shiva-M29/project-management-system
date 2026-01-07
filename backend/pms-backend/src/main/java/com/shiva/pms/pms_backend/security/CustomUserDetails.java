package com.shiva.pms.pms_backend.security;

import com.shiva.pms.pms_backend.entity.User;
import com.shiva.pms.pms_backend.enums.UserStatus;
import jakarta.persistence.Column;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;


public class CustomUserDetails implements UserDetails {
    private final User user;


    public CustomUserDetails(User user)
    {
        this.user=user;
    }

    public User getUser()
    {
       return this.user;
     }
    @Override
    public String getUsername() {

        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }


    @Override
    public boolean isEnabled() {
        return user.getStatus() == UserStatus.APPROVED;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
}
