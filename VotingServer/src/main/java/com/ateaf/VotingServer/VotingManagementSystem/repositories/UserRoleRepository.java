package com.ateaf.VotingServer.VotingManagementSystem.repositories;

import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole,Long> {

}
