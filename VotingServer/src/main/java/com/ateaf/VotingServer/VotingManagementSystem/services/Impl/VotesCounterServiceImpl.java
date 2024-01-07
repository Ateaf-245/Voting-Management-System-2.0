package com.ateaf.VotingServer.VotingManagementSystem.services.Impl;

import com.ateaf.VotingServer.VotingManagementSystem.controllers.VoterVotingStatusController;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VoterVotingStatus;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VotesCounter;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.ElectionRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.VotesCounterRepository;
import com.ateaf.VotingServer.VotingManagementSystem.services.CandidateService;
import com.ateaf.VotingServer.VotingManagementSystem.services.UserService;
import com.ateaf.VotingServer.VotingManagementSystem.services.VotesCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class VotesCounterServiceImpl implements VotesCounterService {

    @Autowired
    private VotesCounterRepository votesCounterRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ElectionRepository electionRepository;

    @Override
    public void addVotesCounter(Candidate candidate) {
     VotesCounter list =  votesCounterRepository.findByCandidate(candidate);
     if (list==null){
         VotesCounter votesCounter = new VotesCounter();

         votesCounter.setCount(1);
         votesCounter.setCandidate(candidate);
         votesCounter.setElection(candidate.getElection());
         votesCounterRepository.save(votesCounter);
     }else {
             if (candidate == list.getCandidate()) {
                 list.setCount(list.getCount() + 1);
                 votesCounterRepository.save(list);
             }
     }

    }

    @Override
    public void removeAllVotesCounterByElection(Long id) {

        Election election = electionRepository.findById(id).orElse(null);

        if (election != null) {
            Set<VotesCounter> votesCounterSet = votesCounterRepository.findAllByElection(election);

            // Use iterator to avoid ConcurrentModificationException
            Iterator<VotesCounter> iterator = votesCounterSet.iterator();
            while (iterator.hasNext()) {
                VotesCounter voterVotingStatus = iterator.next();
                iterator.remove();
                votesCounterRepository.deleteByElection(election);
            }

            electionRepository.save(election);
        }
        List<VotesCounter> countersList = votesCounterRepository.findByElection(election);
        for (VotesCounter vc : countersList) {
            votesCounterRepository.deleteById(vc.getVotesCounterId());
        }
    }

    @Override
    public Map<String,?> getResultByElection(Election election) {

        List<VotesCounter> countersList = votesCounterRepository.findByElection(election);
        Long totalVotesReceived= 0L;
        Long totalVotesReceived1= 0L;
        for (VotesCounter votesCounter : countersList) {
           totalVotesReceived += votesCounter.getCount();

        }
       Optional<VotesCounter> maxCounter = countersList.stream()
                .max(Comparator.comparingLong(VotesCounter::getCount));

        Map<String,Object> map = new HashMap<>();
        map.put("totalVoter",userService.getAllUsers().size());
        map.put("totalCandidate",candidateService.getAllCandidateByElection(election.getElection_id()).size());
        map.put("CandidateVotes",countersList);
        map.put("totalVotesReceived",totalVotesReceived);
        map.put("Winner",maxCounter);
        return map;
    }
}
