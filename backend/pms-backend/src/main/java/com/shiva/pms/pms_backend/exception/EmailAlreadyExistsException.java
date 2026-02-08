package com.shiva.pms.pms_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException(String message)
    {
        super(message);
    }
}
