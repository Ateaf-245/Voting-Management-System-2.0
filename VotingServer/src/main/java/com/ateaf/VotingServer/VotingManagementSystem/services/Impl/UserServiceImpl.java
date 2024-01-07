package com.ateaf.VotingServer.VotingManagementSystem.services.Impl;

import com.ateaf.VotingServer.VotingManagementSystem.exceptions.UserAlreadyExitsException;
import com.ateaf.VotingServer.VotingManagementSystem.exceptions.UserNotFoundException;
import com.ateaf.VotingServer.VotingManagementSystem.models.Role;
import com.ateaf.VotingServer.VotingManagementSystem.models.User;
import com.ateaf.VotingServer.VotingManagementSystem.models.UserRole;
import com.ateaf.VotingServer.VotingManagementSystem.models.VoterVerification;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.RoleRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.UserRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.UserRoleRepository;
import com.ateaf.VotingServer.VotingManagementSystem.services.UserService;
import com.ateaf.VotingServer.VotingManagementSystem.services.VoterVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private VoterVerificationService verificationService;



    @Override
    public User addAdminUser(User user) {
        User local = userRepository.findByEmail(user.getEmail());
        if(local!=null){
            throw new UserAlreadyExitsException("User with provide mail ID : "+local.getEmail()+ " already Exists !!");
        }

        Role role1 = roleRepository.findByName("ADMIN");

        //saving user and role in userRole
        UserRole userRole= new UserRole();
        userRole.setRole(role1);
        userRole.setUser(user);

        user.getUserRoles().add(userRole);
        return userRepository.save(user);
    }

    @Override
    public User addUser(User user) {

        User local = userRepository.findByEmail(user.getEmail());
        if(local!=null){
            throw new UserAlreadyExitsException("User with provide mail ID : "+user.getEmail()+ " already exists !!");
        }
        Role role1 = roleRepository.findByName("NORMAL");

        //saving user and role in userRole
        UserRole userRole= new UserRole();
        userRole.setRole(role1);
        userRole.setUser(user);

        user.getUserRoles().add(userRole);
        User data = userRepository.save(user);

        //adding user id to verification list
        VoterVerification verification = new VoterVerification();
        verification.setUser(data);
        System.out.println(verification);
        verificationService.addVerificationDetails(verification);

        return data;
    }

    @Override
    public User updateUser(User user){
       return userRepository.save(user);
    }

    @Override
    public User getUser(String email) {

        User local = userRepository.findByEmail(email);
        if(local==null){
            throw new UserNotFoundException("User with provide mail ID : "+email+ " does not exists !!");
        }
        local.setPassword("");
        return local; //need to throw exception
    }

    @Override
    public User getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user!=null){
            return user;
        }
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        ArrayList<User> list = new ArrayList<>(userRepository.findAll());
        list.forEach(user -> user.setPassword(""));
        list.removeIf(a -> Objects.equals(a.getEmail(), "ateafbankapur11@gmail.com"));

        return list;
    }

    @Override
    public void deleteUser(String email) {
        User local = userRepository.findByEmail(email);
        if(local==null){
            throw new UserNotFoundException("User with provide mail ID : "+email+ " does not exists !!");
        }

        Set<UserRole> userRoles = local.getUserRoles();
        if (userRoles != null) {
            for (UserRole userRole : userRoles) {
                userRole.setRole(null);
                userRole.setUser(null);
                local.getUserRoles().remove(userRole);
                userRoleRepository.deleteById(userRole.getUserRoleId());
            }
        }

        userRepository.deleteById(local.getUserId());
    }


}
