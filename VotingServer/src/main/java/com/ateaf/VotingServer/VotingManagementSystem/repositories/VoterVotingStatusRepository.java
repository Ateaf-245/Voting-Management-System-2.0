package com.ateaf.VotingServer.VotingManagementSystem.repositories;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VoterVotingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface VoterVotingStatusRepository extends JpaRepository<VoterVotingStatus,Long> {

    public void deleteByElection(Election election);

    public Set<VoterVotingStatus> findAllByElection(Election election);
}
