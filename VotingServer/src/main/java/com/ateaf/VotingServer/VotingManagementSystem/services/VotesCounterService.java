package com.ateaf.VotingServer.VotingManagementSystem.services;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VotesCounter;

import java.util.Map;
import java.util.Set;

public interface VotesCounterService {

    public void addVotesCounter(Candidate candidate);
    public void removeAllVotesCounterByElection(Long id);
    public Map<String,?> getResultByElection(Election election);
}
