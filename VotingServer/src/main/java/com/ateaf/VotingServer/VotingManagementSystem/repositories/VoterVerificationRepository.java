package com.ateaf.VotingServer.VotingManagementSystem.repositories;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.VoterVerification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoterVerificationRepository extends JpaRepository<VoterVerification,Long> {

    VoterVerification findByUser(User user);
}
