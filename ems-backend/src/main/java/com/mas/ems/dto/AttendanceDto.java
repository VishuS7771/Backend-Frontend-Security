package com.mas.ems.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceDto {

    private Long attendanceId;

    private long  userId;

    private LocalDateTime clockIn;

    private LocalDateTime clockOut;

    private Date data;

    private String totalHours;

    private String status;

    private String description;
}
