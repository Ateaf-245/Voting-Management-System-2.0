package com.ateaf.VotingServer.VotingManagementSystem.services.Impl;

import com.ateaf.VotingServer.VotingManagementSystem.exceptions.CandidateNotFoundException;
import com.ateaf.VotingServer.VotingManagementSystem.exceptions.ElectionDetailsNotFoundException;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Candidate;
import com.ateaf.VotingServer.VotingManagementSystem.models.election.Election;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.CandidateRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.ElectionRepository;
import com.ateaf.VotingServer.VotingManagementSystem.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ElectionRepository electionRepository;

    @Override
    public Candidate addCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    @Override
    public void deleteCandidate(Long candidateId) {
        Long electionId = getCandidate(candidateId).getElection().getElection_id();

        Election election = electionRepository.findById(electionId).orElse(null);

        if (election != null) {
            //check if any candidate with given election id
            Set<Candidate> candidates = election.getCandidates();
            Candidate candidateToDelete = candidates.stream()
                    .filter(candidate -> candidate.getCandidate_id().equals(candidateId))
                    .findFirst()
                    .orElse(null);

            if (candidateToDelete != null) {
                candidates.remove(candidateToDelete);
                candidateRepository.delete(candidateToDelete);
                electionRepository.save(election);
            }
        }
    }

    @Override
    public Candidate getCandidate(Long id) {
        Candidate candidate = candidateRepository.findById(id).orElse(null);
        if (candidate==null)
            throw new CandidateNotFoundException("Candidate with given id not found !!");
        return candidate;
    }

    @Override
    public Set<Candidate> getAllCandidates(){
        return new HashSet<>(candidateRepository.findAll());
    }

    @Override
    public Set<Candidate> getAllCandidateByElection(Long election_id) {
        Election election = electionRepository.findById(election_id).orElse(null);
        if (election!=null){
            return new HashSet<>(candidateRepository.findByElection(election));
        }
        throw new ElectionDetailsNotFoundException("No such Election entry found !!");
    }

    @Override
    public Candidate updateCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }
}
