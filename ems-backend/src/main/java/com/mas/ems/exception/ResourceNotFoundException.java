package com.mas.ems.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@Data
public class ResourceNotFoundException extends RuntimeException{
    private String errorCode;

    public ResourceNotFoundException(String message,String errorCode){
        super(message);
        this.errorCode=errorCode;
    }
}