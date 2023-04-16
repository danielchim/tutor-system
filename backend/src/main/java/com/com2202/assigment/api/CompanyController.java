package com.com2202.assigment.api;

import com.com2202.assigment.dto.AuthInput;
import com.com2202.assigment.dto.CompanyInput;
import com.com2202.assigment.entity.Company;
import com.com2202.assigment.entity.Employer;
import com.com2202.assigment.entity.Skills;
import com.com2202.assigment.services.CompanyService;
import com.com2202.assigment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/companies")

public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/")
    public List<Company> getAllCompanies() {

        // Check if email and password are valid
        // boolean isValid = userService.auth(input);

        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public Company getAllCompanies(@PathVariable int id) {

        // Check if email and password are valid
        // boolean isValid = userService.auth(input);

        return companyService.getCompanyById(id);
    }

    @GetMapping("/{id}/employers")
    public List<Employer> getAllEmployersByCompany(@PathVariable int id) {

        // Check if email and password are valid
        // boolean isValid = userService.auth(input);

        return companyService.getAllEmployersByCompany(id);
    }

    @PostMapping("/")
    public boolean createCompany(@RequestBody CompanyInput companyInput) {
        return companyService.createCompany(companyInput);
    }

    @PostMapping("/{id}/update")
    public boolean updateCompany(@PathVariable int id, @RequestBody CompanyInput companyInput) {
        return companyService.updateCompany(id, companyInput);
    }

    @PostMapping("/{id}/delete")
    public boolean deleteCompany(@PathVariable int id) {
        return companyService.deleteCompany(id);

    }

}
