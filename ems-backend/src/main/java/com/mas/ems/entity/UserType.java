package com.mas.ems.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Tbl_UserType",schema = "appmaster")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userTypeId;

    private String userType;

    public UserType(Long aLong) {
    }
}
