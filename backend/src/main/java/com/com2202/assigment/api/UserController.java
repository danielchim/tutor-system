package com.com2202.assigment.api;

import com.com2202.assigment.entity.JobHistory;
import com.com2202.assigment.entity.Role;
import com.com2202.assigment.entity.User;
import com.com2202.assigment.services.JobService;
import com.com2202.assigment.services.RoleService;
import com.com2202.assigment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private JobService jobService;


    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping("/")
    public boolean createUser(@RequestBody User user) {
        Role userRole = user.getRole();
        if (userRole == null) {
            // Set the user's role to the default role
            userRole = roleService.getRoleById(2);
            user.setRole(userRole);
        } else {
            // Check if the user's role exists in the database
            Role existingRole = roleService.getRoleById(userRole.getId());
            if (existingRole == null) {
                // Set the user's role to the default role
                userRole = roleService.getRoleById(9310);
                user.setRole(userRole);
            }
        }

        // Save the user to the database
        return userService.addUser(user);
    }


    @PostMapping("/{id}")
    public boolean updateUser(@PathVariable int id, @RequestBody User user) {
        User existingUser = userService.getUserById(id);
        if (existingUser == null) {
            return false;
        }
        existingUser.setName(user.getName() == null?existingUser.getName():user.getName());
        existingUser.setEmail(user.getEmail() == null?existingUser.getEmail():user.getEmail());
        existingUser.setPassword(user.getPassword() == null?existingUser.getPassword():user.getPassword());
        existingUser.setRole(user.getRole() == null?existingUser.getRole():user.getRole());
        return userService.updateUser(existingUser);
    }

    @PostMapping("delete/{id}")
    public void deleteUserById(@PathVariable int id) {
        userService.deleteUser(id);
    }

    // other API endpoint methods
    @GetMapping("{id}/history")
    public List<JobHistory> getAllJobs(@PathVariable int id) {
        return jobService.getJobHistoryByUser(id);
    }
}



