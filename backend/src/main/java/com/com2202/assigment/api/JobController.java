package com.com2202.assigment.api;

import com.com2202.assigment.dto.JobHistoryInput;
import com.com2202.assigment.dto.JobInput;
import com.com2202.assigment.entity.*;
import com.com2202.assigment.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;
    private JobHistory jobHistory;

    @GetMapping("/")
    public List<Jobs> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Jobs getJobById(@PathVariable int id) {
        return jobService.getJobById(id);
    }

    @GetMapping("/searchByName")
    public List<Jobs> getSkillsByName(@RequestParam(name = "name") String name) {
        String decodedName = null;
        decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
        // Your logic to retrieve skills by name
        return jobService.getJobByName(decodedName);
    }

    @GetMapping("/searchByDateRange")
    public List<Jobs> searchJobsByDateRange(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return jobService.getJobsByDateRange(startDate, endDate);
    }

    @GetMapping("/{id}/applicants")
    public List<User> getJobHistoryByJob(@PathVariable int id) {
        return jobService.getJobHistoryByJob(id);
    }

    @PostMapping("/")
    public void createJob(@RequestBody JobInput job) {
        jobService.createJob(job);
    }

    @PostMapping("/apply")
    public boolean createJobHistory(@RequestBody JobHistoryInput job) {
       return jobService.createJobHistory(job);
    }

    @PostMapping("/{id}")
    public void updateJob(@PathVariable int id, @RequestBody JobInput job) {
        jobService.updateJob(id, job);
    }

//    @DeleteMapping("/{id}")
//    public void deleteJob(@PathVariable int id) {
//        jobService.deleteJob(id);
//    }
}

