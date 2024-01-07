package com.ateaf.VotingServer.VotingManagementSystem.services;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;

import java.util.List;
import java.util.Set;

public interface ElectionService {

    public Election addElection(Election election);
    public void deleteElection(Long id);
    public Election updateElection(Election election);

    public Election getElection(Long id);
    public List<Election> getAllElections();

}
