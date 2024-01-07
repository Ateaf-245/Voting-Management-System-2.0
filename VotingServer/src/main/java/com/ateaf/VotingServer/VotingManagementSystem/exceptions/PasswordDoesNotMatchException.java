package com.ateaf.VotingServer.VotingManagementSystem.exceptions;

public class PasswordDoesNotMatchException extends RuntimeException{

    public PasswordDoesNotMatchException() {
        super("Password Does not Matched");
    }

    public PasswordDoesNotMatchException(String message) {
        super(message);
    }
}
