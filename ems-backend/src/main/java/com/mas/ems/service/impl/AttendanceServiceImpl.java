package com.mas.ems.service.impl;

import com.mas.ems.dto.ClockStatus;
import com.mas.ems.entity.Attendance;
import com.mas.ems.entity.Employee;
import com.mas.ems.repository.AttendanceRepository;
import com.mas.ems.repository.EmployeeRepository;
import com.mas.ems.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Attendance clockIn(Long empId) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String formattedDate = simpleDateFormat.format(date);
        Attendance attendance1 = attendanceRepository.findByDateAndUserId(simpleDateFormat.parse(formattedDate), empId);
        if (attendance1 == null) {
            Employee employee = employeeRepository.findById(empId).get();
            Attendance attendance = new Attendance();
            attendance.setEmployee(employee);
            attendance.setDate(simpleDateFormat.parse(formattedDate));
            attendance.setClockIn(LocalDateTime.now());
            return attendanceRepository.save(attendance);
        }
        return null;
    }
    @Override
    public Attendance clockOut(Long empId) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String formattedDate = simpleDateFormat.format(date);
        Attendance attendance = attendanceRepository.findByDateAndUserId(simpleDateFormat.parse(formattedDate), empId);
        attendance.setClockOut(LocalDateTime.now());

        Duration duration = Duration.between(attendance.getClockIn(), attendance.getClockOut());
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;
        long seconds = duration.getSeconds() % 60;
        String formattedDuration = String.format("%d:%02d:%02d", hours, minutes, seconds);

        attendance.setTotalHours(formattedDuration);
        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendanceByUserAndMonth(Long empId, int year, int month) {
        List<Attendance> attendances = attendanceRepository.findByEmpIddAndMonth(empId, year, month);
        return attendances;
    }

    @Override
    public ClockStatus isClockedIn(Long empId) throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        ClockStatus clockStatus = new ClockStatus();
        clockStatus.setClockedIn(false);
        clockStatus.setHasPunchedOutToday(false);

        String date = simpleDateFormat.format(new Date());
        Date parsedDate = simpleDateFormat.parse(date);
        Attendance attendance = attendanceRepository.findByDateAndUserId(parsedDate, empId);

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
