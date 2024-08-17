package com.mas.ems.service;

import com.mas.ems.dto.ClockStatus;
import com.mas.ems.entity.Attendance;

import java.text.ParseException;
import java.util.List;

public interface AttendanceService {

    public Attendance clockIn(Long empId) throws ParseException;

    public Attendance clockOut(Long empId) throws ParseException;

    public List<Attendance> getAttendanceByUserAndMonth(Long empId, int year, int month);

    public ClockStatus isClockedIn(Long empId) throws ParseException;



}
