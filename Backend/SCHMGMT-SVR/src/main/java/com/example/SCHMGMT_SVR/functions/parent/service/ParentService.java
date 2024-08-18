package com.example.SCHMGMT_SVR.functions.parent.service;

import com.example.SCHMGMT_SVR.models.Parent;

import java.util.List;

public interface ParentService {
    Parent createParent(Parent parent);
    List<Parent> fetchAllParent();
    Parent fetchParentById(Long id);
    Parent updateParentById(Long id, Parent parent);
    String deleteParentById(Long id);
    long countParents();
    List<Parent> searchParentsByName(String name);
}
