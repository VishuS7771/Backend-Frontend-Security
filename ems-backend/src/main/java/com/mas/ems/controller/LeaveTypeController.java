package com.mas.ems.controller;

import com.mas.ems.entity.LeaveType;
import com.mas.ems.service.impl.LeaveTypeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaveType")
public class LeaveTypeController {

    @Autowired
    private LeaveTypeServiceImpl leaveTypeService;

    @GetMapping("/gettypes")
    public List<LeaveType> getAllLeaveType(){
        return leaveTypeService.getAllLeaves();
    }
}
