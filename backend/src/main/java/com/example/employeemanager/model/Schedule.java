package com.example.employeemanager.model;

import java.io.Serializable;
import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Schedule implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private DayOfWeek day;
    private LocalTime startTime; 
    private LocalTime endTime;
    private String role;
    private String department;
    private boolean hasLunch;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    public Schedule() {}

    public Schedule(DayOfWeek day, LocalTime startTime, LocalTime endTime, String role, String department, boolean hasLunch, Employee employee) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.role = role;
        this.department = department;
        this.hasLunch = hasLunch;
        this.employee = employee;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public DayOfWeek getDay() {
        return day;
    }
    public void setDay(DayOfWeek day) {
        this.day = day;
    }

    public LocalTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }
    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }

    public boolean isHasLunch() {
        return hasLunch;
    }
    public void setHasLunch(boolean hasLunch) {
        this.hasLunch = hasLunch;
    }

    public Employee getEmployee() {
        return employee;
    }
    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
