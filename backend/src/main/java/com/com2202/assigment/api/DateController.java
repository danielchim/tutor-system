package com.com2202.assigment.api;

import com.com2202.assigment.entity.Date;
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
    public List<Date> getAllDates() {
        return dateService.getAllDates();
    }
    @PostMapping("/update")
    public boolean updateRole(@RequestBody Date date) {
        return dateService.updateSystemDate(date);
    }
}
