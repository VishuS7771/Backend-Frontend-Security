package com.mas.ems.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Tbl_leave",schema = "appemployee")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveId;

    @ManyToOne
    @JoinColumn(name = "empId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "leaveTypeId")
    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String totalLeave;

    private String remarks;

    private String status;
}
