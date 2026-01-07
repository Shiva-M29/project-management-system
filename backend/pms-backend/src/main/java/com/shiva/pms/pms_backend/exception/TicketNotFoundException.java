package com.shiva.pms.pms_backend.exception;

public class TicketNotFoundException extends RuntimeException{
    public TicketNotFoundException(String message)
    {
        super(message);
    }
}
