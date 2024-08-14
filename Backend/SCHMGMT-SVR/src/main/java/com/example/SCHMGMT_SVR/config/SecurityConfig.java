package com.example.SCHMGMT_SVR.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(crsf -> crsf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/parent/**").permitAll()
                        .requestMatchers("/teacher/**").permitAll()
                        .requestMatchers("/classroom/**").permitAll()
                        .requestMatchers("/subject/**").permitAll()
                        .requestMatchers("/student/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}