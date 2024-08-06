package com.mas.ems.controller;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Leave;
import com.mas.ems.service.impl.LeaveServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    @Autowired
    private LeaveServiceImpl leaveService;

    @PostMapping("/apply")
    public ResponseEntity<Leave> applyLeave(@RequestBody LeaveDto leaveDto) {
        Leave leave = leaveService.applyLeave(leaveDto);
        return ResponseEntity.ok(leave);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Leave>> getLeavesByUser(@PathVariable Long empId) {
        List<Leave> leaves = leaveService.getLeavesByUser(empId);
        return ResponseEntity.ok(leaves);
    }

    @PostMapping("/approveLeave/{leaveId}")
    public ResponseEntity<?> approveLeave(@PathVariable Long leaveId){
        leaveService.approveLeave(leaveId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/rejectLeave/{leaveId}")
    public ResponseEntity<?> rejectLeave(@PathVariable Long leaveId){
        leaveService.rejectLeave(leaveId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
