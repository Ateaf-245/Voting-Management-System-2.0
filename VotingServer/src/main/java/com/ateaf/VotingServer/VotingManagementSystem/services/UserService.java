package com.ateaf.VotingServer.VotingManagementSystem.services;

import com.ateaf.VotingServer.VotingManagementSystem.models.Role;
import com.ateaf.VotingServer.VotingManagementSystem.models.User;

import java.util.List;

public interface UserService {

    //changePassword
    public User updateUser(User user);

    //voter
    public User addUser(User user);
    public User getUser(String email);
    public User getUserById(Long userId);

    //admin
    public User addAdminUser(User user);
    public List<User> getAllUsers();
    public void deleteUser(String email);
}
