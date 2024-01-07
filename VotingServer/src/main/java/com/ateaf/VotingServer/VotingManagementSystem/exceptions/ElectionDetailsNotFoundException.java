package com.ateaf.VotingServer.VotingManagementSystem.exceptions;

public class ElectionDetailsNotFoundException extends RuntimeException{

    public ElectionDetailsNotFoundException() {
        super("Election does not exist !!");
    }

    public ElectionDetailsNotFoundException(String message) {
        super(message);
    }
}
