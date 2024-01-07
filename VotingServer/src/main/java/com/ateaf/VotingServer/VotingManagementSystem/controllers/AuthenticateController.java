package com.ateaf.VotingServer.VotingManagementSystem.controllers;

import com.ateaf.VotingServer.VotingManagementSystem.config.JwtUtils;
import com.ateaf.VotingServer.VotingManagementSystem.exceptions.UserNotPermittedException;
import com.ateaf.VotingServer.VotingManagementSystem.models.JwtRequest;
import com.ateaf.VotingServer.VotingManagementSystem.models.JwtResponse;
import com.ateaf.VotingServer.VotingManagementSystem.models.UserRole;
import com.ateaf.VotingServer.VotingManagementSystem.models.VoterVerification;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.RoleRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.UserRoleRepository;
import com.ateaf.VotingServer.VotingManagementSystem.repositories.VoterVerificationRepository;
import com.ateaf.VotingServer.VotingManagementSystem.services.Impl.UserDetailsImpl;
import com.ateaf.VotingServer.VotingManagementSystem.services.Impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private VoterVerificationRepository verificationRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRole;



    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        }catch (UsernameNotFoundException e){
            e.printStackTrace();
            throw  new Exception("User not found");
        }

        //Authenticate
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtils.generateToken(userDetails);

        //get all entry of userRoles
        Set<UserRole> ur = new HashSet<>(userRole.findAll());

        //get all entry of VoterValidation
        List<VoterVerification> verifications = verificationRepository.findAll();
        for (UserRole u: ur){
            // check if userRole is admin or not. If Admin then pass token to the user.
            if(Objects.equals(u.getRole().getName(), "ADMIN")){
                if (Objects.equals(u.getUser().getEmail(), jwtRequest.getUsername())){
                    return  ResponseEntity.ok(new JwtResponse(token));
                }
            }else if(Objects.equals(u.getRole().getName(), "NORMAL")){

                //if userRole is Normal then check in the validation table if user is verified or not
                verifications.forEach(voterVerification -> {
                    if (voterVerification.getStatus()==null){
                        throw new UserNotPermittedException("User is not verified");
                    }
                });
            }
        }

        return ResponseEntity.ok(new JwtResponse(token));

    }

    private void authenticate(String username, String password) throws Exception{
         try{
             authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));

         }catch (DisabledException e){
             throw new Exception("USER DISABLED "+e.getMessage());

         }catch (BadCredentialsException e){
             throw new BadCredentialsException(e.getMessage());
         }
    }

    //returns the details of current user
    @GetMapping("/current-user")
    public Map<String, Object> getCurrentUser(Principal principal){
        UserDetailsImpl userDetails = (UserDetailsImpl) this.userDetailsService.loadUserByUsername(principal.getName());

        //set password to empty so the user can see it
        userDetails.getUser().setPassword("");

        Map<String, Object> response = new HashMap<>();
        response.put("user", userDetails.getUser());
        response.put("authorities", userDetails.getAuthorities());

        return response;
    }


}
