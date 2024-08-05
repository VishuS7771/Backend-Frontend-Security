package com.mas.ems.service.impl;

import com.mas.ems.dto.ClockStatus;
import com.mas.ems.entity.Attendance;
import com.mas.ems.entity.Employee;
import com.mas.ems.entity.User;
import com.mas.ems.repository.AttendanceRepository;
import com.mas.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class AttendanceServiceImpl {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    public Attendance clockIn(Long userId) throws ParseException {
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-mm-dd");
        String date=simpleDateFormat.format(new Date());
        Attendance attendance1=attendanceRepository.findByDateAndUserId(simpleDateFormat.parse(date),userId);
        if(attendance1==null) {
            User user = userRepository.findById(userId).get();
            Attendance attendance = new Attendance();
            attendance.setUser(user);
            attendance.setDate(simpleDateFormat.parse(date));
            attendance.setClockIn(LocalDateTime.now());
            return attendanceRepository.save(attendance);
        }
        return null;
    }

    public Attendance clockOut(Long userId) {
        Attendance attendance = attendanceRepository.findByUserId(userId);
        attendance.setClockOut(LocalDateTime.now());

        LocalDateTime clockInTime = attendance.getClockIn();
        LocalDateTime now = LocalDateTime.now();

        Duration duration = Duration.between(clockInTime, now);
        double v = duration.toHours() + (duration.toMinutes() % 60) / 60.0;
        attendance.setTotalHours(String.valueOf(v));
        return attendanceRepository.save(attendance);
    }

//    public List<Attendance> getAttendanceByUser(Long empId) {
//        return attendanceRepository.findByEmpId(empId);
//    }

    public ClockStatus isClockedIn(Long userId) throws ParseException {
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-mm-dd");
        ClockStatus clockStatus=new ClockStatus();
        String date=simpleDateFormat.format(new Date());
        Date parsedDate = simpleDateFormat.parse(date);
        Attendance attendance=attendanceRepository.findByDateAndUserId(parsedDate,userId);
        if(attendance==null){
            clockStatus.setClockedIn(false);
            if (attendance.getClockOut() != null) {
                clockStatus.setHasPunchedOutToday(true);
            }
        }
        return clockStatus;
    }
}
