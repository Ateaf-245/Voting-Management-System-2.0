package com.ateaf.VotingServer.VotingManagementSystem.controllers;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

@RestController
@RequestMapping("/candidate")
@CrossOrigin("*")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    //add new candidate
    @PostMapping("/addNew")
    public ResponseEntity<?> addNewCandidate(@RequestPart("user") Candidate candidate, @RequestPart("photo") MultipartFile photo){

        try {
            if (photo.isEmpty()) {
                return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
            } else {
                byte[] bytes = photo.getBytes();
                candidate.setImage(bytes); // Assuming you have a field to store the Base64 image in the User class.
            }

            return new ResponseEntity<>(candidateService.addCandidate(candidate), HttpStatus.OK);
        }catch (IOException e){
            e.printStackTrace();
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // update candidate
    @PutMapping("/update")
    public ResponseEntity<?> updateCandidate(@RequestBody Candidate candidate){
        return ResponseEntity.ok(candidateService.updateCandidate(candidate));
    }

    //get candidate by election id
    @GetMapping("/election/{eid}")
    public ResponseEntity<?> getAllCandidatesByElection(@PathVariable Long eid){
        return ResponseEntity.ok(candidateService.getAllCandidateByElection(eid));
    }

    //get all candidate
    @GetMapping("/")
    public ResponseEntity<?> getAllCandidates(){
        return ResponseEntity.ok(candidateService.getAllCandidates());
    }

    // get candidate by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getSingleCandidate(@PathVariable Long id){
        return ResponseEntity.ok(candidateService.getCandidate(id));
    }

    //delete candidate by id
    @DeleteMapping("/{id}")
    public void deleteCandidate(@PathVariable Long id){
        System.out.println(" deleting candidate "+id );
        try {
            candidateService.deleteCandidate(id);
        }catch (Exception e){
            e.printStackTrace();
        }

    }


}


