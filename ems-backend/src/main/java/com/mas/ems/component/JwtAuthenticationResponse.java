package com.mas.ems.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private long userId;


    public JwtAuthenticationResponse(String jwt) {
    }

    public JwtAuthenticationResponse(String jwt, Long userId) {
    }
}
