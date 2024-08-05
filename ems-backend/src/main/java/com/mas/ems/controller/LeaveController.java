package com.mas.ems.controller;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Leave;
import com.mas.ems.service.LeaveServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<Leave>> getLeavesByUser(@PathVariable Long userId) {
        List<Leave> leaves = leaveService.getLeavesByUser(userId);
        return ResponseEntity.ok(leaves);
    }
}
