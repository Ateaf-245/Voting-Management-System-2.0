package com.ateaf.VotingServer.VotingManagementSystem.services.Impl;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.VoterVerification;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.UserRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.VoterVerificationRepository;
import com.ateaf.VotingServer.VotingManagementSystem.services.VoterVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VoterVerificationServiceImpl implements VoterVerificationService {

    @Autowired
    private VoterVerificationRepository verificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public VoterVerification addVerificationDetails(VoterVerification verification) {
        return verificationRepository.save(verification);
    }

    @Override
    public Optional<VoterVerification> getVerificationDetails(Long verificationId) {

        Optional<VoterVerification> verification = verificationRepository.findById(verificationId);
        verification.get().getUser().setPassword("");
        return verification;
    }

    @Override
    public List<VoterVerification> getValidationUsers() {

        List<VoterVerification> voterVerifications = new ArrayList<>(verificationRepository.findAll());

        voterVerifications.removeIf(v -> v.getStatus() != null);

        voterVerifications.forEach(verification -> verification.getUser().setPassword(""));

        return voterVerifications;
    }

    @Override
    public void deleteVerificationDetails(Long verificationId,String message) {
        try {
            VoterVerification verification = verificationRepository.findById(verificationId).get();
            verification.setStatus("Approved");
            verificationRepository.save(verification);

            sendMail(message,verification.getUser().getEmail());

        } catch (Exception e) {
            // Handle any exceptions that may occur during the deletion process
            e.printStackTrace();
        }
    }

    @Override
    public void sendMail(String message,String email){

        //Todo : mail feature
        System.out.println("to :"+email);
        System.out.println("mail :"+message);
    }
}
