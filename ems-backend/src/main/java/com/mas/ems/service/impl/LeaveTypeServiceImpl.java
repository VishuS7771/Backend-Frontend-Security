package com.mas.ems.service.impl;

import com.mas.ems.entity.LeaveType;
import com.mas.ems.repository.LeaveTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveTypeServiceImpl {

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    public List<LeaveType> getAllLeaves() {
    return leaveTypeRepository.findAll();

    }
}
