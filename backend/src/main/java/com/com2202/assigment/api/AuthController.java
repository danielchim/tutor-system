package com.com2202.assigment.api;

import com.com2202.assigment.dto.AuthInput;
import com.com2202.assigment.entity.Interview;
import com.com2202.assigment.entity.Skills;
import com.com2202.assigment.entity.User;
import com.com2202.assigment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<User> authenticate(@RequestBody AuthInput input) {

        // Check if email and password are valid
        User res = userService.auth(input);

        if (res != null) {
            // If authentication is successful, return the authenticated user
            return ResponseEntity.ok(res);
        } else {
            // If authentication fails, return an error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
