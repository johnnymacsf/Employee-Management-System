package com.example.employeemanager.service;

import java.time.DayOfWeek;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employeemanager.model.Employee;
import com.example.employeemanager.model.Schedule;
import com.example.employeemanager.repo.ScheduleRepo;

@Service
public class ScheduleService {
    private final ScheduleRepo scheduleRepo;
    private final EmployeeService employeeService;

    @Autowired
    public ScheduleService(ScheduleRepo scheduleRepo, EmployeeService employeeService){
        this.scheduleRepo = scheduleRepo;
        this.employeeService = employeeService;
    } 

    public Schedule addSchedule(Schedule schedule) {
        Long employeeId = schedule.getEmployee().getId();

        Employee employee = employeeService.findEmployeeById(employeeId);
        schedule.setEmployee(employee);
        
        return scheduleRepo.save(schedule);
    }

    public Schedule updateSchedule(Schedule updatedSchedule) {
        return scheduleRepo.save(updatedSchedule);
    }

    public List<Schedule> getAllSchedules(){
        return scheduleRepo.findAll();
    }

    public void deleteSchedule(Long id){
        scheduleRepo.deleteById(id);
    }

    public List<Schedule> getSchedulesByDay(DayOfWeek day){
        return scheduleRepo.findByDay(day);
    }
}
