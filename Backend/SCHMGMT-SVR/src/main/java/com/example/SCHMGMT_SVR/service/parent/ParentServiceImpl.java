package com.example.SCHMGMT_SVR.service.parent;

import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.repositories.ParentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ParentServiceImpl implements ParentService {

    private final ParentRepository parentRepository;

    public ParentServiceImpl(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @Override
    public Parent createParent(Parent parent) {
        parent.setCreatedAt(LocalDateTime.now());
        return parentRepository.save(parent);
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

            if (Objects.nonNull(parent.getFirstName()) && !"".equalsIgnoreCase(parent.getFirstName())) {
                originalParent.setFirstName(parent.getFirstName());
            }
            if (Objects.nonNull(parent.getLastName()) && !"".equalsIgnoreCase(parent.getLastName())) {
                originalParent.setLastName(parent.getLastName());
            }
            if (Objects.nonNull(parent.getEmail()) && !"".equalsIgnoreCase(parent.getEmail())) {
                originalParent.setEmail(parent.getEmail());
            }
            if (Objects.nonNull(parent.getPhoneNumber()) && !"".equalsIgnoreCase(parent.getPhoneNumber())) {
                originalParent.setPhoneNumber(parent.getPhoneNumber());
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
