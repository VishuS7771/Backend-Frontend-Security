package com.mas.ems.service.impl;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Employee;
import com.mas.ems.entity.Leave;
import com.mas.ems.entity.LeaveType;

import com.mas.ems.entity.User;
import com.mas.ems.repository.LeaveRepository;
import com.mas.ems.repository.LeaveTypeRepository;
import com.mas.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveServiceImpl {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    @Autowired
    private UserRepository userRepository;

    public Leave applyLeave(LeaveDto leaveDto) {
        Leave leave = new Leave();
        leave.setUser(userRepository.findById(leaveDto.getUserId()).get());
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setRemarks(leaveDto.getRemarks());
        leave.setLeaveType(leaveTypeRepository.findById(leaveDto.getLeaveTypeId()).get());
        long daysBetween = ChronoUnit.DAYS.between(leaveDto.getStartDate(), leaveDto.getEndDate()) + 1; // Add 1 to include both start and end dates
        leave.setTotalLeave(String.valueOf(daysBetween));
        return leaveRepository.save(leave);
    }

    public List<Leave> getLeavesByUser(Long userId) {
        return leaveRepository.findByUserId(userId);
    }
}
