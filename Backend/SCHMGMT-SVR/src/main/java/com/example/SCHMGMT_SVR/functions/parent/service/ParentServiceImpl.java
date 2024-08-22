package com.example.SCHMGMT_SVR.functions.parent.service;

import com.example.SCHMGMT_SVR.exception.duplicate.DuplicateFieldException;
import com.example.SCHMGMT_SVR.functions.parent.dto.ParentCreateDto;
import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.functions.parent.repository.ParentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Objects;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParentServiceImpl implements ParentService {

    @Autowired
    private final ParentRepository parentRepository;

    public ParentServiceImpl(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @Override
    public Parent createParent(ParentCreateDto dto) {
        Parent newParent = new Parent();

        BeanUtils.copyProperties(dto, newParent);

        if (parentRepository.existsByEmail(newParent.getEmail())) {
            throw new DuplicateFieldException("A parent with the email " + newParent.getEmail() + " already exists.");
        }
        if (parentRepository.existsByPhoneNumber(newParent.getPhoneNumber())) {
            throw new DuplicateFieldException("A parent with the phone number " + newParent.getPhoneNumber() + " already exists.");
        }

        newParent.setCreatedAt(LocalDateTime.now());
        return parentRepository.save(newParent);
    }

    @Override
    public List<Parent> searchParentsByName(String name) {
        if (Objects.nonNull(name) && !name.isEmpty()) {
            return parentRepository.findByFirstNameIgnoreCase(name);
        } else {
            return parentRepository.findAll();
        }
    }

    @Override
    public List<Parent> fetchAllParent() {
        List<Parent> allParents = parentRepository.findAll();
        return allParents.stream()
                .sorted(Comparator.comparing(Parent::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Parent fetchParentById(Long id) {
        Optional<Parent> parent = parentRepository.findById(id);
        if(parent.isPresent()) {
            return parent.get();
        }
        return null;
    }

    @Override
    public long countParents() {
        return parentRepository.count();
    }

    @Override
    public Parent updateParentById(Long id, Parent parent) {
        Optional<Parent> optionalParent = parentRepository.findById(id);

        if (optionalParent.isPresent()) {
            Parent originalParent = optionalParent.get();

            if (Objects.nonNull(parent.getEmail()) && !"".equalsIgnoreCase(parent.getEmail())) {
                if (!originalParent.getEmail().equalsIgnoreCase(parent.getEmail()) && parentRepository.existsByEmail(parent.getEmail())) {
                    throw new DuplicateFieldException("A parent with the email " + parent.getEmail() + " already exists.");
                }
                originalParent.setEmail(parent.getEmail());
            }

            if (Objects.nonNull(parent.getPhoneNumber()) && !"".equalsIgnoreCase(parent.getPhoneNumber())) {
                if (!originalParent.getPhoneNumber().equalsIgnoreCase(parent.getPhoneNumber()) && parentRepository.existsByPhoneNumber(parent.getPhoneNumber())) {
                    throw new DuplicateFieldException("A parent with the phone number " + parent.getPhoneNumber() + " already exists.");
                }
                originalParent.setPhoneNumber(parent.getPhoneNumber());
            }

            if (Objects.nonNull(parent.getFirstName()) && !"".equalsIgnoreCase(parent.getFirstName())) {
                originalParent.setFirstName(parent.getFirstName());
            }
            if (Objects.nonNull(parent.getLastName()) && !"".equalsIgnoreCase(parent.getLastName())) {
                originalParent.setLastName(parent.getLastName());
            }
            return parentRepository.save(originalParent);
        }
        return null;
    }

    @Override
    public String deleteParentById(Long id) {
        if (parentRepository.findById(id).isPresent()) {
            parentRepository.deleteById(id);
            return "Parent deleted successfully";
        } else {
            return "Parent not found";
        }
    }
}
