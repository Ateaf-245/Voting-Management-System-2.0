package com.ateaf.VotingServer.VotingManagementSystem.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExitsException.class)
    public ResponseEntity<Map<String,Object>> userAlreadyExitsExceptionHandler(UserAlreadyExitsException ex){
        Map<String,Object> map = new HashMap<>();
        map.put("message",ex.getMessage());
        map.put("status", HttpStatus.FOUND);
        map.put("success","true");

        return ResponseEntity.status(HttpStatus.FOUND).body(map);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> userNotFoundException(UserNotFoundException notFoundException){

        ApiResponse apiResponse = ApiResponse.builder().message(notFoundException.getMessage()).success(true).build();
        return new ResponseEntity<>(apiResponse,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotPermittedException.class)
    public ResponseEntity<?> userNotPermittedException(UserNotPermittedException notPermittedException){
        Map<String,Object> map = new HashMap<>();
        map.put("message",notPermittedException.getMessage());
        map.put("status", HttpStatus.FORBIDDEN);
        map.put("success","true");

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(map);
    }


    @ExceptionHandler(ElectionHasStartedAlreadyException.class)
    public ResponseEntity<?> electionHasStartedAlreadyException(ElectionHasStartedAlreadyException e){
        Map<String,Object> map = new HashMap<>();
        map.put("message",e.getMessage());
        map.put("status", HttpStatus.METHOD_NOT_ALLOWED);
        map.put("success","true");

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(map);
    }

    @ExceptionHandler(PasswordDoesNotMatchException.class)
    public ResponseEntity<?> passwordDoesNotMatchException(PasswordDoesNotMatchException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", e.getMessage());
        map.put("status", HttpStatus.FORBIDDEN);
        map.put("success", "true");

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(map);
    }
}
