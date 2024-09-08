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

    private static final String API_V1 = "/api/v1/"; // versioning

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(SWAGGER_WHITELIST).permitAll()
                        .requestMatchers(API_V1 + "/parent/**").permitAll()
                        .requestMatchers(API_V1 + "/teacher/**").permitAll()
                        .requestMatchers(API_V1 + "/classroom/**").permitAll()
                        .requestMatchers(API_V1 + "/subject/**").permitAll()
                        .requestMatchers(API_V1 + "/student/**").permitAll()
                        .requestMatchers(API_V1 + "/attendance/**").permitAll()
                        .requestMatchers(API_V1 + "/user/**").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}