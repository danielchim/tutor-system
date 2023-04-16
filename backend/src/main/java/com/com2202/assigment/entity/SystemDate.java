package com.com2202.assigment.entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "system_date")
public class SystemDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "startdate")
    private LocalDate startDate;

    @Column(name = "endate")
    private LocalDate endDate;

    public SystemDate() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
