package com.example.SCHMGMT_SVR.service.parent;

import com.example.SCHMGMT_SVR.models.Parent;

import java.util.List;

public interface ParentService {

    Parent createParent(Parent parent);

    List<Parent> fetchAllParent();

    Parent updateParentById(Long id, Parent parent);
}
