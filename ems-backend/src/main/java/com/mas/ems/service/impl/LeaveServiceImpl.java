package com.mas.ems.service.impl;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Leave;
import com.mas.ems.exception.ResourceNotFoundException;
import com.mas.ems.repository.EmployeeRepository;
import com.mas.ems.repository.LeaveRepository;
import com.mas.ems.repository.LeaveTypeRepository;
import com.mas.ems.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveServiceImpl  implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Leave applyLeave(LeaveDto leaveDto) {
        Leave leave = new Leave();
        if(leaveDto.getLeaveId()!=null){
            leave.setLeaveId(leaveDto.getLeaveId());
        }
        leave.setEmployee(employeeRepository.findById(leaveDto.getEmpId()).get());
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setRemarks(leaveDto.getRemarks());
        leave.setLeaveType(leaveTypeRepository.findById(leaveDto.getLeaveTypeId()).get());
        long daysBetween = ChronoUnit.DAYS.between(leaveDto.getStartDate(), leaveDto.getEndDate()) + 1; // Add 1 to include both start and end dates
        leave.setTotalLeave(String.valueOf(daysBetween));
        leave.setStatus("Not Approved");
        return leaveRepository.save(leave);
    }

    @Override
    public List<Leave> getLeavesByUser(Long empId) {
        return leaveRepository.findByEmpId(empId);
    }

    @Override
    public void approveLeave(Long leaveId) {
        Leave leave =leaveRepository.findById(leaveId).orElseThrow(()-> new ResourceNotFoundException("leave not found with"+ leaveId ,"400"));
        leave.setStatus("Approved");
        leaveRepository.save(leave);
    }

    @Override
    public void rejectLeave(Long leaveId) {
        Leave leave =leaveRepository.findById(leaveId).orElseThrow(()-> new ResourceNotFoundException("leave not found with"+ leaveId ,"400"));
        leave.setStatus("Rejected");
        leaveRepository.save(leave);
    }

    @Override
    public Leave getLeaveById(long leaveId) {
        Leave leave =leaveRepository.findById(leaveId).orElseThrow(()-> new ResourceNotFoundException("leave not found with"+ leaveId ,"400"));
        return leave;
    }

    @Override
    public void deleteLeave(long leaveId){
        Leave leave =leaveRepository.findById(leaveId).orElseThrow(()-> new ResourceNotFoundException("leave not found with"+ leaveId ,"400"));
        leaveRepository.deleteById(leave.getLeaveId());
    }

    @Override
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }
}
