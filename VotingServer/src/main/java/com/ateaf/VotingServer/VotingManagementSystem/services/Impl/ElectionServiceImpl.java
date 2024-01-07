package com.ateaf.VotingServer.VotingManagementSystem.services.Impl;

import com.ateaf.VotingServer.VotingManagementSystem.exceptions.ElectionDetailsNotFoundException;
import com.ateaf.VotingServer.VotingManagementSystem.exceptions.ElectionHasStartedAlreadyException;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.ElectionRepository;
import com.ateaf.VotingServer.VotingManagementSystem.services.ElectionService;
import com.ateaf.VotingServer.VotingManagementSystem.services.VoterVotingStatusService;
import com.ateaf.VotingServer.VotingManagementSystem.services.VotesCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ElectionServiceImpl implements ElectionService {

    @Autowired
    private ElectionRepository electionRepository;

    @Autowired
    private VotesCounterService votesCounterService;

    @Autowired
    private VoterVotingStatusService voterVotingStatusService;

    @Override
    public Election addElection(Election election) {
        return electionRepository.save(election);
    }

    @Override
    public Election updateElection(Election election) {
        return electionRepository.save(election);
    }

    @Override
    public void deleteElection(Long id) {
       Election election = getElection(id);
       if (isStartTimeValid(election.getStartDateTime(),election.getEndDateTime())){
           votesCounterService.removeAllVotesCounterByElection(id);
           voterVotingStatusService.removeAllVoterVotingStatusByElection(id);
           electionRepository.deleteById(id);
       }else{
           throw new ElectionHasStartedAlreadyException("Election has started Already we can't delete till it end");
       }
    }

    public boolean isStartTimeValid(LocalDateTime startTime, LocalDateTime endTime) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return startTime.isAfter(currentDateTime) || endTime.isBefore(currentDateTime);
    }

    @Override
    public Election getElection(Long id) {
        return electionRepository.findById(id).orElseThrow( ()->new ElectionDetailsNotFoundException("No such Election entry found !!"));
    }

    @Override
    public List<Election> getAllElections() {
        return new ArrayList<>(electionRepository.findAll());
    }
}
