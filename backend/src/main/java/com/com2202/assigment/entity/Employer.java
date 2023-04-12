package com.com2202.assigment.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

@Entity
@Table(name = "employer")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Employer {

    @Id
    @Column(name = "idEmployer")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Company_idCompany")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_idUser")
    private User user;

    // constructors, getters, and setters

    public Employer() {
    }

    public Employer(int id, Company company, User user) {
        this.id = id;
        this.company = company;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

