package com.com2202.assigment.api;

import com.com2202.assigment.dto.AuthInput;
import com.com2202.assigment.dto.CompanyInput;
import com.com2202.assigment.dto.InterviewInput;
import com.com2202.assigment.entity.Company;
import com.com2202.assigment.entity.Interview;
import com.com2202.assigment.entity.Jobs;
import com.com2202.assigment.entity.Skills;
import com.com2202.assigment.services.CompanyService;
import com.com2202.assigment.services.InterviewService;
import com.com2202.assigment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @GetMapping("/")
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/{interviewId}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable int interviewId) {
        Interview interview = interviewService.getInterviewById(interviewId);
        return ResponseEntity.ok(interview);
    }

    @GetMapping("/{id}/interviews")
    public List<Interview> getInterviewByUserId(@PathVariable int id, @RequestParam(value = "employerUserId", required = false) Integer employerUserId) {
        return interviewService.getInterviewByUserId(id, employerUserId);
    }

    @PostMapping("/")
    public ResponseEntity<Interview> createInterview(@RequestBody InterviewInput interviewInput) {
        Interview interview = interviewService.createInterview(interviewInput);
        return ResponseEntity.created(URI.create("/api/interviews/" + interview.getId())).body(interview);
    }

    @PostMapping("/{interviewId}/update")
    public ResponseEntity<Interview> updateInterview(@PathVariable int interviewId, @RequestBody InterviewInput interviewInput) {
        Interview interview = interviewService.updateInterview(interviewId, interviewInput);
        return ResponseEntity.ok(interview);
    }

    @PostMapping("/{interviewId}/delete")
    public ResponseEntity<Void> deleteInterview(@PathVariable int interviewId) {
        interviewService.deleteInterview(interviewId);
        return ResponseEntity.noContent().build();
    }
}
