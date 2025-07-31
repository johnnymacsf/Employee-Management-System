package com.example.employeemanager;

import java.time.DayOfWeek;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.employeemanager.model.Schedule;
import com.example.employeemanager.service.ScheduleService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/schedule")
public class ScheduleResource {
    private final ScheduleService scheduleService;
    

    public ScheduleResource(ScheduleService scheduleService){
        this.scheduleService = scheduleService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.getAllSchedules();
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @GetMapping("/find/{day}")
    public ResponseEntity<List<Schedule>> getScheduleByDay(@PathVariable("day") DayOfWeek day) {
        List<Schedule> schedules = scheduleService.getSchedulesByDay(day);
        return new ResponseEntity<>(schedules, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Schedule> addSchedule(@RequestBody Schedule schedule){
        Schedule newSchedule = scheduleService.addSchedule(schedule);
        return new ResponseEntity<>(newSchedule, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Schedule> updateSchedule(@RequestBody Schedule schedule){
        Schedule updatedSchedule = scheduleService.updateSchedule(schedule);
        return new ResponseEntity<>(updatedSchedule, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable("id") Long id) {
        scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
