package com.ateaf.VotingServer.VotingManagementSystem.repositories;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VoterVotingStatus;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VotesCounter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface VotesCounterRepository extends JpaRepository<VotesCounter,Long> {

    public VotesCounter findByCandidate(Candidate candidate);

    public List<VotesCounter> findByElection(Election election);

    public Set<VotesCounter> findAllByElection(Election election);

    public void deleteByElection(Election election);

}
