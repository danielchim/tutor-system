package com.com2202.assigment.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills_jobs_link")
public class SkillsJobsLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_skills_jobs_link")
    private int idSkillsJobsLink;

    @ManyToOne
    @JoinColumn(name = "skills_idskills")
    private Skills skills;

    @ManyToOne
    @JoinColumn(name = "jobs_idjobs")
    private Jobs jobs;

    public SkillsJobsLink() {
    }

    public int getIdSkillsJobsLink() {
        return idSkillsJobsLink;
    }

    public void setIdSkillsJobsLink(int idSkillsJobsLink) {
        this.idSkillsJobsLink = idSkillsJobsLink;
    }

    public Skills getSkills() {
        return skills;
    }

    public void setSkills(Skills skills) {
        this.skills = skills;
    }

    public Jobs getJobs() {
        return jobs;
    }

    public void setJobs(Jobs jobs) {
        this.jobs = jobs;
    }
}
