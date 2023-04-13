package com.com2202.assigment.dto;

import com.com2202.assigment.entity.Employer;
import com.com2202.assigment.entity.Jobs;
import com.com2202.assigment.entity.User;

import java.time.LocalDateTime;
import java.util.Date;

public class InterviewInput {

    private LocalDateTime date;
    private User user;
    private Jobs job;
    private Employer employer;

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Jobs getJob() {
        return job;
    }

    public void setJob(Jobs job) {
        this.job = job;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }
}

