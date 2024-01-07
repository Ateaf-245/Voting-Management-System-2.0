package com.ateaf.VotingServer.VotingManagementSystem.controllers;

import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.VoterVotingStatus;
import com.ateaf.VotingServer.VotingManagementSystem.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/VoterVotingStatus")
@CrossOrigin("*")
public class VoterVotingStatusController {

    @Autowired
    private VoterVotingStatusService voterVotingStatusService;

    @Autowired
    private UserService userService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ElectionService electionService;

    @Autowired
    private VotesCounterService votesCounterService;

    @PostMapping("/add")
    public ResponseEntity<?> addVoterVotingStatus(@RequestBody Map<String, Long> VotingData) {
        Long voterId = VotingData.get("voterId");
        Long electionId = VotingData.get("electionId");
        Long candidateId = VotingData.get("candidateId");

        // Your logic to process the voterVotingStatus
        VoterVotingStatus voterVotingStatus = new VoterVotingStatus();

        Candidate candidate = candidateService.getCandidate(candidateId);

        voterVotingStatus.setUser(userService.getUserById(voterId));
        voterVotingStatus.setCandidate(candidate);
        voterVotingStatus.setElection(candidate.getElection());

        //updating the candidate votes
        votesCounterService.addVotesCounter(candidate);

        return ResponseEntity.ok(voterVotingStatusService.addVoterVotingStatus(voterVotingStatus));
    }

    @GetMapping("/check")
    public boolean checkVotingStatus(@RequestParam Long voterId, @RequestParam Long electionId) {
        Election election = electionService.getElection(electionId);
        return voterVotingStatusService.getVoterVotingStatus(userService.getUserById(voterId), election);
    }

    @GetMapping("/dashboard/{userId}")
    public Map<String, Integer> getVoterDashBoardData(@PathVariable Long userId) {
        Map<String, Integer> map = new HashMap<>();

        int totalElection = electionService.getAllElections().size();

        List<VoterVotingStatus> voterVotingStatusList = voterVotingStatusService.getAll();


        int electionYouVoted = (int) voterVotingStatusList.stream().filter(voterVotingStatus ->
                Objects.equals(voterVotingStatus.getUser().getUserId(), userId)).count();

        List<Election> elections = electionService.getAllElections();
        int completed = 0;
        int open = 0;
        int yet = 0;
        for (Election election : elections) {
            if (LocalDateTime.now().isBefore(election.getStartDateTime())) {
                yet++;
            }
            if (LocalDateTime.now().isAfter(election.getStartDateTime()) && LocalDateTime.now().isBefore(election.getEndDateTime())) {
                open++;
            } else {
                completed++;
            }
        }

        map.put("TotalElection", totalElection);
        map.put("ElectionYouVoted", electionYouVoted);
        map.put("PendingElection", Math.max(totalElection - electionYouVoted - open - completed - yet, 0));
        map.put("CompletedElection", completed);

        return map;
    }

    @DeleteMapping("Delete/{eid}")
    public void delete(@PathVariable Long eid){

        voterVotingStatusService.removeAllVoterVotingStatusByElection(eid);

    }
}
