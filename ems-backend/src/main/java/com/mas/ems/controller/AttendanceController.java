package com.mas.ems.controller;


import com.mas.ems.dto.ClockStatus;
import com.mas.ems.service.impl.AttendanceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.time.YearMonth;
import java.util.List;
import com.mas.ems.entity.Attendance;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceServiceImpl attendanceService;

    @PostMapping("/clockIn/{userId}")
    public ResponseEntity<Void> clockIn(@PathVariable Long userId) {
        try {
            attendanceService.clockIn(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/clockOut/{userId}")
    public ResponseEntity<Void> clockOut(@PathVariable Long userId) {
        try {
            attendanceService.clockOut(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getAttendance/{userId}")
    public ResponseEntity<List<Attendance>> getAttendanceByUserAndMonth(
            @PathVariable Long userId,
            @RequestParam int year,
            @RequestParam int month) {
        List<Attendance> attendances = attendanceService.getAttendanceByUserAndMonth(userId, year, month);
        return ResponseEntity.ok(attendances);
    }

    @GetMapping("/clock-status/{userId}")
    public ResponseEntity<ClockStatus> getClockStatus(@PathVariable Long userId) throws ParseException {
        ClockStatus clockStatus= attendanceService.isClockedIn(userId);

        return ResponseEntity.ok(clockStatus);
    }

}


