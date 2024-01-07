package com.ateaf.VotingServer.VotingManagementSystem.exceptions;

public class UserNotPermittedException extends RuntimeException{

    public UserNotPermittedException() {super("User already exist");
    }

    public UserNotPermittedException(String message) {super(message);
    }
}
