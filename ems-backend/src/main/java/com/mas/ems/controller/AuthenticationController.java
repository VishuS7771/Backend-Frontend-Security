package com.mas.ems.controller;

import com.mas.ems.component.JwtAuthenticationResponse;
import com.mas.ems.component.JwtTokenProvider;
import com.mas.ems.dto.UserDto;
import com.mas.ems.entity.Employee;
import com.mas.ems.entity.User;
import com.mas.ems.repository.EmployeeRepository;
import com.mas.ems.repository.UserRepository;
import com.mas.ems.service.impl.TokenBlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private TokenBlacklistService tokenBlacklistService;

//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
//        if (userRepository.existsByUsername(userDto.getUsername())) {
//            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
//        }
//
//        User user = new User();
//        user.setUsername(userDto.getUsername());
//        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
//
//        user = userRepository.save(user);
//
//        return ResponseEntity.ok(user + "User registered successfully");
//    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto loginRequest) {
        Optional<Employee> user =userRepository.findByEmailId(loginRequest.getUsername());
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        JwtAuthenticationResponse jwtAuthenticationResponse=new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setAccessToken(jwt);
        jwtAuthenticationResponse.setEmpId(user.get().getEmpId());
        jwtAuthenticationResponse.setUserType(user.get().getUserType().getUserTypeId());

        return ResponseEntity.ok(jwtAuthenticationResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        tokenBlacklistService.addToBlacklist(jwtToken);
        return ResponseEntity.ok("Successfully logged out.");
    }


}
