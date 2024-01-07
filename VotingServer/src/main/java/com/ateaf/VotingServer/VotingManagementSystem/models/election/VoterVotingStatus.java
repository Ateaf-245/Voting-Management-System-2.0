package com.ateaf.VotingServer.VotingManagementSystem.models.election;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "VoterVotingStatus")
public class VoterVotingStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long VoterVotingStatusId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Election election;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Candidate candidate;
}
