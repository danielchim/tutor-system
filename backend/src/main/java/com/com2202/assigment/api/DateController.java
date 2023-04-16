package com.com2202.assigment.api;

import com.com2202.assigment.entity.SystemDate;
import com.com2202.assigment.entity.Role;
import com.com2202.assigment.services.DateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/date")
public class DateController {

    @Autowired
    DateService dateService;
    @GetMapping("/")
    public List<SystemDate> getAllDates() {
        return dateService.getAllDates();
    }
    @PostMapping("/update")
    public boolean updateRole(@RequestBody SystemDate date) {
        return dateService.updateSystemDate(date);
    }
}
