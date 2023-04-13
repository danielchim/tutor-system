package com.com2202.assigment.api;

import com.com2202.assigment.dto.AuthInput;
import com.com2202.assigment.entity.Company;
import com.com2202.assigment.entity.Skills;
import com.com2202.assigment.services.CompanyService;
import com.com2202.assigment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

}
