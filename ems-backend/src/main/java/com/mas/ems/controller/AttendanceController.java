package com.mas.ems.controller;


import com.mas.ems.dto.ClockStatus;
import com.mas.ems.service.impl.AttendanceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.util.List;
import com.mas.ems.entity.Attendance;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceServiceImpl attendanceService;

    @PostMapping("/clockIn/{userId}")
    public ResponseEntity<Attendance> clockIn(@PathVariable Long userId) throws ParseException {
        Attendance attendance = attendanceService.clockIn(userId);
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("/clockOut/{userId}")
    public ResponseEntity<Attendance> clockOut(@PathVariable Long userId) {
        Attendance attendance = attendanceService.clockOut(userId);
        return ResponseEntity.ok(attendance);
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Attendance>> getAttendanceByUser(@PathVariable Long userId) {
//        List<Attendance> attendances = attendanceService.getAttendanceByUser(userId);
//        return ResponseEntity.ok(attendances);
//    }

    @GetMapping("/clock-status/{userId}")
    public ResponseEntity<ClockStatus> getClockStatus(@PathVariable Long userId) throws ParseException {
        ClockStatus clockStatus= attendanceService.isClockedIn(userId);

        return ResponseEntity.ok(clockStatus);
    }

}


