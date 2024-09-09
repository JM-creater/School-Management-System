package com.example.SCHMGMT_SVR.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final String[] SWAGGER_WHITELIST = {
        "/swagger-ui/**",
        "/v3/api-docs/**",
        "/swagger-resources/**",
        "/swagger-resources"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(SWAGGER_WHITELIST).permitAll()
                        .requestMatchers("/api/v1/parent/**").permitAll()
                        .requestMatchers("/api/v1/teacher/**").permitAll()
                        .requestMatchers("/api/v1/classroom/**").permitAll()
                        .requestMatchers("/api/v1/subject/**").permitAll()
                        .requestMatchers("/api/v1/student/**").permitAll()
                        .requestMatchers("/api/v1/attendance/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}