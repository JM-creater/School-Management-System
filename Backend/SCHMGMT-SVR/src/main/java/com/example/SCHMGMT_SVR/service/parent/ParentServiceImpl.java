package com.example.SCHMGMT_SVR.service.parent;

import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.repositories.ParentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ParentServiceImpl implements ParentService {

    private final ParentRepository parentRepository;

    public ParentServiceImpl(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @Override
    public Parent createParent(Parent parent) {
        return parentRepository.save(parent);
    }

    @Override
    public List<Parent> fetchAllParent() {
        List<Parent> allParents = parentRepository.findAll();
        return allParents;
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
}
