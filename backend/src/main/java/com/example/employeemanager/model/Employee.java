package com.example.employeemanager.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Employee implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String department;
    private String phone;
    @Column(nullable = false, updatable = false)
    private String employeeCode;
    
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Schedule> schedules = new ArrayList<>();

    public Employee(){}

    public Employee(String name, String email, String jobTitle, String department, String phone, String employeeCode){
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.department = department;
        this.phone = phone;
        this.employeeCode = employeeCode;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }
    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public List<Schedule> getSchedules(){
        return schedules;
    }
    public void setSchedules(List<Schedule> schedules){
        this.schedules = schedules;
    }

    public void addSchedule(Schedule schedule) {
        schedules.add(schedule);
        schedule.setEmployee(this);
    }

    public void removeSchedule(Schedule schedule) {
        schedules.remove(schedule);
        schedule.setEmployee(null);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", jobTitle='" + jobTitle + '\'' +
                ", department='" + department + '\'' +
                ", phone='" + phone + '\'' +
                ", schedule='" + schedules + '\'' +
                '}';
    }
}
