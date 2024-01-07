package com.ateaf.VotingServer.VotingManagementSystem.services.Impl;

import com.ateaf.VotingServer.VotingManagementSystem.exceptions.UserNotFoundException;
import com.ateaf.VotingServer.VotingManagementSystem.exceptions.UserNotPermittedException;
import com.ateaf.VotingServer.VotingManagementSystem.models.Role;
import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.UserRole;
import com.ateaf.VotingServer.VotingManagementSystem.models.VoterVerification;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.RoleRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.UserRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.UserRoleRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.VoterVerificationRepository;
import com.sun.xml.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(username);

        if (user == null) {
            throw new UserNotFoundException("user not found !!");
        }else{
            return new UserDetailsImpl(user);
        }
    }
}
