package com.mas.ems.service.impl;

import com.mas.ems.entity.LeaveType;
import com.mas.ems.repository.LeaveTypeRepository;
import com.mas.ems.service.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveTypeServiceImpl implements LeaveTypeService {

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    @Override
    public List<LeaveType> getAllLeaves() {
    return leaveTypeRepository.findAll();

    }
}
