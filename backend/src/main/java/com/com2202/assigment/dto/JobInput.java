package com.com2202.assigment.dto;

import java.util.Date;
import java.util.List;

public class JobInput {
    private String name;
    private Date created_at;
    private UserInput user;
    private List<SkillInput> skills;
    private String description;

    // getters and setters


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public UserInput getUser() {
        return user;
    }

    public void setUser(UserInput user) {
        this.user = user;
    }

    public List<SkillInput> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillInput> skills) {
        this.skills = skills;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

