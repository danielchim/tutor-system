package com.com2202.assigment.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "skills")
public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idskills")
    private Integer idSkills;

    @Column(name = "name")
    private String name;

    public Skills() {}

    public Skills(Integer idSkills, String name) {
        this.idSkills = idSkills;
        this.name = name;
    }

    public Integer getIdSkills() {
        return idSkills;
    }

    public void setIdSkills(Integer idSkills) {
        this.idSkills = idSkills;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
