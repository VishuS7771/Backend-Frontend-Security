package com.mas.ems.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Tbl_Designation",schema = "appmaster")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "designation_id")  // Make sure this matches the column name in the database
    private long designationId;

    @Column(name = "designation_name")
    private String designationName;

    @ManyToOne
    @JoinColumn(name = "department_id")  // Ensure this is correct as well
    private Department department;

    public Designation(Long aLong) {
    }
}
