package com.ateaf.VotingServer.VotingManagementSystem.services;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VoterVotingStatus;

import java.util.List;

public interface VoterVotingStatusService {

    public VoterVotingStatus addVoterVotingStatus(VoterVotingStatus voterVotingStatus);
    public void removeAllVoterVotingStatusByElection(Long eid);
    public boolean getVoterVotingStatus(User user, Election election);
    public List<VoterVotingStatus> getAll();
}
