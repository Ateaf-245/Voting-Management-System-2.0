package com.ateaf.VotingServer.VotingManagementSystem.services;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;

import java.util.Set;

public interface CandidateService {

    public Candidate addCandidate(Candidate candidate);
    public void deleteCandidate(Long id);

    public Candidate getCandidate(Long id);
    public Set<Candidate> getAllCandidates();

    public Set<Candidate> getAllCandidateByElection(Long Election_id);

    public Candidate updateCandidate(Candidate candidate);
}
