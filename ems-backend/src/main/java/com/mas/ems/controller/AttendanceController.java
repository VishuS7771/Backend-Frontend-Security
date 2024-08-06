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

    @PostMapping("/clockIn/{empId}")
    public ResponseEntity<Void> clockIn(@PathVariable Long empId) {
        try {
            attendanceService.clockIn(empId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/clockOut/{empId}")
    public ResponseEntity<Void> clockOut(@PathVariable Long empId) {
        try {
            attendanceService.clockOut(empId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getAttendance/{empId}")
    public ResponseEntity<List<Attendance>> getAttendanceByUserAndMonth(
            @PathVariable Long empId,
            @RequestParam int year,
            @RequestParam int month) {
        List<Attendance> attendances = attendanceService.getAttendanceByUserAndMonth(empId, year, month);
        return ResponseEntity.ok(attendances);
    }

    @GetMapping("/clock-status/{empId}")
    public ResponseEntity<ClockStatus> getClockStatus(@PathVariable Long empId) throws ParseException {
        ClockStatus clockStatus= attendanceService.isClockedIn(empId);

        return ResponseEntity.ok(clockStatus);
    }

}


