package com.com2202.assigment.api;

import com.com2202.assigment.entity.Employer;
import com.com2202.assigment.entity.Jobs;
import com.com2202.assigment.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @GetMapping("/{id}/jobs")
    public List<Jobs> getJobsByEmployerId(@PathVariable int id) {
        return employerService.getJobsByEmployerId(id);
    }

    @PostMapping("/")
    public boolean createEmployer(@RequestBody Employer employer) {
        return employerService.saveEmployer(employer);
    }

    @PostMapping("/{id}/update")
    public boolean updateEmployer(@PathVariable int id, @RequestBody Employer employer) {
        Employer existingEmployer = employerService.getEmployerById(id);
        if (existingEmployer == null) {
            return false;
        }
        existingEmployer.setUser(employer.getUser());
        existingEmployer.setCompany(employer.getCompany());
        return employerService.updateEmployer(existingEmployer);
    }

    @PostMapping("/{id}/delete")
    public boolean deleteEmployerById(@PathVariable int id) {
        return employerService.deleteEmployerById(id);
    }

    // other API endpoint methods

}

