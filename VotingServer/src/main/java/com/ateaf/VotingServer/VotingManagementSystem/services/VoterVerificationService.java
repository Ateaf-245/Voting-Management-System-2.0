package com.ateaf.VotingServer.VotingManagementSystem.services;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.VoterVerification;

import java.util.List;
import java.util.Optional;

public interface VoterVerificationService {

    public VoterVerification addVerificationDetails(VoterVerification verification);
    public Optional<VoterVerification> getVerificationDetails(Long id);

    public List<VoterVerification> getValidationUsers();

    public void deleteVerificationDetails(Long id,String message);
    public void sendMail(String message,String email);
}
