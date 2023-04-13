package com.com2202.assigment.api;

import com.com2202.assigment.entity.Employer;
import com.com2202.assigment.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping("/")
    public List<Employer> getAllEmployers() {
        return employerService.getAllEmployers();
    }

    @GetMapping("/{id}")
    public Employer getEmployerById(@PathVariable int id) {
        return employerService.getEmployerById(id);
    }

    @PostMapping("/")
    public boolean createEmployer(@RequestBody Employer employer) {
        return employerService.saveEmployer(employer);
    }

    @PostMapping("/update/{id}")
    public boolean updateEmployer(@PathVariable int id, @RequestBody Employer employer) {
        Employer existingEmployer = employerService.getEmployerById(id);
        if (existingEmployer == null) {
            return false;
        }
        existingEmployer.setUser(employer.getUser());
        existingEmployer.setCompany(employer.getCompany());
        return employerService.updateEmployer(existingEmployer);
    }

    @PostMapping("/delete/{id}")
    public boolean deleteEmployerById(@PathVariable int id) {
        return employerService.deleteEmployerById(id);
    }

    // other API endpoint methods

}

