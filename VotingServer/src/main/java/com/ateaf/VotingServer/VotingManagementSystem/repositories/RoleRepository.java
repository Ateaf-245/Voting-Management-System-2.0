package com.ateaf.VotingServer.VotingManagementSystem.repositories;

import com.ateaf.VotingServer.VotingManagementSystem.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Role findByName(String name);
}
