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
import java.time.YearMonth;
import java.util.Date;
import java.util.List;

@Service
public class AttendanceServiceImpl {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    public Attendance clockIn(Long userId) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String formattedDate = simpleDateFormat.format(date);
        Attendance attendance1=attendanceRepository.findByDateAndUserId(simpleDateFormat.parse(formattedDate),userId);
        if(attendance1==null) {
            User user = userRepository.findById(userId).get();
            Attendance attendance = new Attendance();
            attendance.setUser(user);
            attendance.setDate(simpleDateFormat.parse(formattedDate));
            attendance.setClockIn(LocalDateTime.now());
            return attendanceRepository.save(attendance);
        }
        return null;
    }

    public Attendance clockOut(Long userId) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String formattedDate = simpleDateFormat.format(date);
        Attendance attendance=attendanceRepository.findByDateAndUserId(simpleDateFormat.parse(formattedDate),userId);
        attendance.setClockOut(LocalDateTime.now());

        Duration duration = Duration.between( attendance.getClockIn(), attendance.getClockOut());
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;
        long seconds = duration.getSeconds() % 60;
        String formattedDuration = String.format("%d:%02d:%02d", hours, minutes, seconds);

        attendance.setTotalHours(formattedDuration);
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByUserAndMonth(Long userId, int year, int month) {
         List<Attendance> attendances=attendanceRepository.findByUserIdAndMonth(userId, year, month);


        return attendances;
    }

    public ClockStatus isClockedIn(Long userId) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        ClockStatus clockStatus = new ClockStatus();
        clockStatus.setClockedIn(false);
        clockStatus.setHasPunchedOutToday(false);

        String date = simpleDateFormat.format(new Date());
        Date parsedDate = simpleDateFormat.parse(date);
        Attendance attendance = attendanceRepository.findByDateAndUserId(parsedDate, userId);

        if (attendance != null) {
            if (attendance.getClockOut() != null) {
                clockStatus.setHasPunchedOutToday(true);
            } else {
                clockStatus.setClockedIn(true);
            }
        }

        return clockStatus;
    }

}
