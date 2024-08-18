package com.example.SCHMGMT_SVR.functions.parent.controller;

import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.functions.parent.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
public class ParentController {

    @Autowired
    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/parent")
    public Parent createParent(@RequestBody Parent parent) {
        return parentService.createParent(parent);
    }

    @GetMapping("/parent/search")
    public List<Parent> searchByParentName(
            @RequestParam(required = false) String name
    ) {
        return parentService.searchParentsByName(name);
    }

    @GetMapping("/parent")
    public List<Parent> fetchAllParents() {
        return parentService.fetchAllParent();
    }

    @GetMapping("/parent/{id}")
    public Parent fetchParentById(@PathVariable Long id) {
        return parentService.fetchParentById(id);
    }

    @GetMapping("/parent/count")
    public long countParent() {
        return parentService.countParents();
    }

    @PutMapping("/parent/{id}")
    public Parent updateParent(@PathVariable("id") Long id, @RequestBody Parent parent) {
        return parentService.updateParentById(id, parent);
    }

    @DeleteMapping("/parent/{id}")
    public String deleteParentId(@PathVariable("id") Long id) {
        return parentService.deleteParentById(id);
    }
}
