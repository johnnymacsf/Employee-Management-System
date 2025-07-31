package com.example.employeemanager.repo;

import java.time.DayOfWeek;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.employeemanager.model.Schedule;

public interface ScheduleRepo extends JpaRepository<Schedule, Long>{

    @Query("SELECT s FROM Schedule s JOIN FETCH s.employee WHERE s.day = :day")
    List<Schedule> findByDay(@Param("day") DayOfWeek day);
}
