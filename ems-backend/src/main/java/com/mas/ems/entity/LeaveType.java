package com.mas.ems.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "Tbl_LeaveType",schema = "appmaster")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long leaveTypeId;

    private String leaveType;

    public LeaveType(long leaveTypeId) {
    }
}
