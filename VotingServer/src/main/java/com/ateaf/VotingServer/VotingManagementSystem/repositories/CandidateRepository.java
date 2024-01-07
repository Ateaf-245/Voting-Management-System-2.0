package com.ateaf.VotingServer.VotingManagementSystem.repositories;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CandidateRepository extends JpaRepository<Candidate,Long> {

   Set<Candidate> findByElection(Election election);
}
