package com.shoply.service;

import java.util.HashMap;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

import com.shoply.dto.AuthResponse;
import com.shoply.dto.LoginRequest;
import com.shoply.dto.SignupRequest;
import com.shoply.entity.Role;
import com.shoply.entity.User;
import com.shoply.repository.UserRepository;
import com.shoply.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;

    private final Map<String, String> otpStorage = new HashMap<>();

    private final Map<String, Long> otpExpiry = new HashMap<>();

    // ================= REGISTER =================

    public AuthResponse register(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(
                    null,
                    "Email already exists",
                    null
            );
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setPhone(request.getPhone());
        user.setRole(Role.USER);
        
        user.setJoinedDate(java.time.LocalDateTime.now());

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                "Registration Successful",
                user.getRole().name()
        );
    }

    // ================= LOGIN =================

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse(
                    null,
                    "User Not Found",
                    null
            );
        }

        // Compare Encrypted Password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return new AuthResponse(
                    null,
                    "Invalid Password",
                    null
            );
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                "Login Successful",
                user.getRole().name()
        );
    }
    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        otpStorage.put(email, otp);

        otpExpiry.put(email, System.currentTimeMillis() + (5 * 60 * 1000));

        emailService.sendOtpEmail(email, user.getFullName(), otp);

        return "OTP Sent Successfully";
    }
    
 // ================= VERIFY OTP =================

    public String verifyOtp(String email, String otp) {

        if (!otpStorage.containsKey(email)) {
            return "OTP Not Found";
        }

        if (System.currentTimeMillis() > otpExpiry.get(email)) {
            otpStorage.remove(email);
            otpExpiry.remove(email);
            return "OTP Expired";
        }

        if (!otpStorage.get(email).equals(otp)) {
            return "Invalid OTP";
        }

        return "OTP Verified";
    }

    // ================= RESET PASSWORD =================

    public String resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        otpStorage.remove(email);
        otpExpiry.remove(email);

        return "Password Updated Successfully";
    }
    
 // ================= CHANGE PASSWORD =================

    public String changePassword(
            String email,
            String currentPassword,
            String newPassword) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return "Current Password is Incorrect";
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);

        return "Password Changed Successfully";
    }
}