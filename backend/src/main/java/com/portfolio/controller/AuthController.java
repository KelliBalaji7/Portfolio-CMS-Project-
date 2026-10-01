package com.portfolio.controller;

import com.portfolio.model.AuthRequest;
import com.portfolio.model.AuthResponse;
import com.portfolio.model.User;
import com.portfolio.repository.UserRepository;
import com.portfolio.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            User user = userRepository.findByUsername(authRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
            return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole()));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication failed: " + e.getMessage());
        }
    }
}
