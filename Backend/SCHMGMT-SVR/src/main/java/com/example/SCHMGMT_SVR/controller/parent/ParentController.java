package com.example.SCHMGMT_SVR.controller.parent;

import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.service.parent.ParentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ParentController {

    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/parent")
    public Parent createParent(@RequestBody Parent parent) {
        return parentService.createParent(parent);
    }

    @GetMapping("/parent")
    public List<Parent> fetchAllParents() {
        return parentService.fetchAllParent();
    }

    @GetMapping("/parent/{id}")
    public Parent fetchParentById(@PathVariable Long id) {
        return parentService.fetchParentById(id);
    }

    @PutMapping("/parent/{id}")
    public Parent updateParent(@PathVariable("id") Long id, @RequestBody Parent parent) {
        return parentService.updateParentById(id, parent);
    }
}
