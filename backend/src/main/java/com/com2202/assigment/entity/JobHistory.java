package com.com2202.assigment.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "job_history")
public class JobHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idjob_history")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_idUser", referencedColumnName = "idUser")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jobs_idjobs", referencedColumnName = "idjobs")
    private Jobs job;

    @Column(name = "apply_date")
    private LocalDate applyDate;


    public JobHistory() {
    }

    public JobHistory(int id, User user, Jobs job, LocalDate applyDate) {
        this.id = id;
        this.user = user;
        this.job = job;
        this.applyDate = applyDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public LocalDate getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(LocalDate applyDate) {
        this.applyDate = applyDate;
    }
}

