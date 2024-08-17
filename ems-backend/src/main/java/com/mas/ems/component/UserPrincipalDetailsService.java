package com.mas.ems.component;

import com.mas.ems.entity.Employee;
import com.mas.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserPrincipalDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee user = userRepository.findByEmailId(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + username));
        return new UserPrincipal(user.getEmpId(), user.getEmail(), user.getPassword());
    }

    public UserDetails loadUserById(Long id) {
        Employee user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
        return new UserPrincipal(user.getEmpId(), user.getEmail(), user.getPassword());
    }
}
