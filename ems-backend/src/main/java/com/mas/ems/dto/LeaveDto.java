package com.mas.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveDto {

    private Long leaveId;

    private long  empId;

    private long leaveTypeId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String totalLeave;

    private String remarks;

    private String status;
}

