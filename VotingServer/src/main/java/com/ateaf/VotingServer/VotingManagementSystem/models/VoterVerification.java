package com.ateaf.VotingServer.VotingManagementSystem.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "VoterVerification")
public class VoterVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long verification_id;

    private String status;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;
}
