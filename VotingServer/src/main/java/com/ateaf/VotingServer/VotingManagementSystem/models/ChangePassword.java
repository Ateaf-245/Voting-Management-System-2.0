package com.ateaf.VotingServer.VotingManagementSystem.models;

import lombok.Data;

@Data
public class ChangePassword {
    private Long userId;
    private String oldPassword;
    private String newPassword;

}
