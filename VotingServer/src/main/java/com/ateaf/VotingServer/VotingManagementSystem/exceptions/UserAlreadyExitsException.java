package com.ateaf.VotingServer.VotingManagementSystem.exceptions;

public class UserAlreadyExitsException extends RuntimeException{

    public UserAlreadyExitsException() {
        super("User already exists !!");
    }

    public UserAlreadyExitsException(String message) {
        super(message);
    }
}
