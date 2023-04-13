package com.com2202.assigment.dto;

import com.com2202.assigment.entity.User;

public class CompanyInput {
    private String name;
    private Boolean status;
    private User owner;

    // constructor, getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}

