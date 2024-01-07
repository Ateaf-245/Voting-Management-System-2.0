package com.ateaf.VotingServer.VotingManagementSystem.models.election;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "votesCounter")
public class VotesCounter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long votesCounterId;

    @ManyToOne(fetch = FetchType.EAGER)
    private Election election;

    @ManyToOne(fetch = FetchType.EAGER)
    private Candidate candidate;

    private long count;
}
