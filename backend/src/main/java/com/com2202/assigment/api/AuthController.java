package com.com2202.assigment.api;

import com.com2202.assigment.dto.AuthInput;
import com.com2202.assigment.entity.Skills;
import com.com2202.assigment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public boolean authenticate(@RequestBody AuthInput input) {

        // Check if email and password are valid
        boolean isValid = userService.auth(input);

        if (isValid) {
            // If authentication is successful, return a JWT token
            // String token = jwtService.generateToken(email);
            return true; //ResponseEntity.ok(token);
        } else {
            // If authentication fails, return an error message
            return false; //ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
