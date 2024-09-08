package com.example.SCHMGMT_SVR.functions.parent.service;

import com.example.SCHMGMT_SVR.functions.parent.dto.ParentCreateDto;
import com.example.SCHMGMT_SVR.models.Parent;

import java.util.List;

public interface ParentService
{

    /**
     * Creates a new parent in the database from the given DTO.
     *
     * @param dto the DTO containing the information about the parent to be created
     * @return the created parent
     */
    Parent createParent(ParentCreateDto dto);

    List<Parent> fetchAllParent();

    Parent fetchParentById(Long id);

    Parent updateParentById(Long id, Parent parent);

    String deleteParentById(Long id);

    long countParents();

    List<Parent> searchParentsByName(String name);
}
