package com.mas.ems.controller;

import com.mas.ems.dto.LeaveDto;
import com.mas.ems.entity.Leave;
import com.mas.ems.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/apply")
    public ResponseEntity<Leave> applyLeave(@RequestBody LeaveDto leaveDto) {
        Leave leave = leaveService.applyLeave(leaveDto);
        return ResponseEntity.ok(leave);
    }

    @GetMapping("/user/{empId}")
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

    @GetMapping("/getById/{leaveId}")
    public ResponseEntity<Leave> getLeaveById(@PathVariable long leaveId){
        Leave leave=leaveService.getLeaveById(leaveId);
        return ResponseEntity.ok(leave);
    }

    @DeleteMapping("/delete/{leaveId}")
    public void deleteLeaveById(@PathVariable long leaveId){
     leaveService.deleteLeave(leaveId);
    }

    @GetMapping("getAll")
    public ResponseEntity<?> getAllLeave(){
        List<Leave> leave=leaveService.getAllLeaves();

        return ResponseEntity.ok(leave);
    }

}
