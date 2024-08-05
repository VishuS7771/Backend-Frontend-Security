package com.mas.ems.service;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Employee;
import com.mas.ems.entity.Leave;
import com.mas.ems.entity.LeaveType;

import com.mas.ems.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl {

    @Autowired
    private LeaveRepository leaveRepository;

    public Leave applyLeave(LeaveDto leaveDto) {
        Leave leave = new Leave();
        leave.setEmployee(new Employee(leaveDto.getEmpId()));
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setRemarks(leaveDto.getRemarks());
        leave.setLeaveType(new LeaveType(leaveDto.getLeaveTypeId()));
        leave.setTotalLeave(leaveDto.getTotalLeave());
        return leaveRepository.save(leave);
    }

    public List<Leave> getLeavesByUser(Long userId) {
        return leaveRepository.findByUserId(userId);
    }
}
