package com.example.SCHMGMT_SVR.functions.user.service.impl;

import com.example.SCHMGMT_SVR.functions.user.repository.UserRepository;
import com.example.SCHMGMT_SVR.functions.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


}
