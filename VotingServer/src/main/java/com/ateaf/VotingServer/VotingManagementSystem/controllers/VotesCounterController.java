package com.ateaf.VotingServer.VotingManagementSystem.controllers;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VotesCounter;
import com.ateaf.VotingServer.VotingManagementSystem.services.ElectionService;
import com.ateaf.VotingServer.VotingManagementSystem.services.VotesCounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/votesCounter")
@CrossOrigin("*")
public class VotesCounterController {

    @Autowired
    private VotesCounterService votesCounterService;

    @Autowired
    private ElectionService electionService;


    @GetMapping("/ElectionResult/{election_id}")
    public ResponseEntity<?> getResultByElection(@PathVariable Long election_id){
        Election election = electionService.getElection(election_id);
        return ResponseEntity.ok(votesCounterService.getResultByElection(election));
    }

}
