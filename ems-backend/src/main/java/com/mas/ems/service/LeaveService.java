package com.mas.ems.service;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Leave;

import java.util.List;

public interface LeaveService {

    public Leave applyLeave(LeaveDto leaveDto);

    public List<Leave> getLeavesByUser(Long empId);

    public void approveLeave(Long leaveId);

    public void rejectLeave(Long leaveId);

    public Leave getLeaveById(long leaveId);

    public void deleteLeave(long leaveId);

    public List<Leave> getAllLeaves();

}
