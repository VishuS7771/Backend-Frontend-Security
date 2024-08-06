package com.mas.ems.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Tbl_attendance",schema = "appemployee")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long attendanceId;

    @ManyToOne
    @JoinColumn(name = "empId")
    private Employee employee;

    private LocalDateTime clockIn;

    private LocalDateTime clockOut;

    private Date date;

    private String totalHours;

    private String status;

    private String description;

}
