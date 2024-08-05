package com.mas.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClockStatus {


    private boolean isClockedIn=true;

    private boolean hasPunchedOutToday=false;
}
