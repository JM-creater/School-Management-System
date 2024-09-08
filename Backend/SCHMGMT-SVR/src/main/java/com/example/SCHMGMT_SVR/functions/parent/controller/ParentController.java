package com.example.SCHMGMT_SVR.functions.parent.controller;

import com.example.SCHMGMT_SVR.functions.parent.dto.ParentCreateDto;
import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.functions.parent.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parent")
public class ParentController {

    @Autowired
    private final ParentService parentService;

    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping
    public Parent createParent(@RequestBody ParentCreateDto dto) {
        return parentService.createParent(dto);
    }

    @GetMapping("/search")
    public List<Parent> searchByParentName(
            @RequestParam(required = false) String name
    ) {
        return parentService.searchParentsByName(name);
    }

    @GetMapping
    public List<Parent> fetchAllParents() {
        return parentService.fetchAllParent();
    }

    @GetMapping("/{id}")
    public Parent fetchParentById(@PathVariable Long id) {
        return parentService.fetchParentById(id);
    }

    @GetMapping("/count")
    public long countParent() {
        return parentService.countParents();
    }

    @PutMapping("/{id}")
    public Parent updateParent(@PathVariable("id") Long id, @RequestBody Parent parent) {
        return parentService.updateParentById(id, parent);
    }

    @DeleteMapping("/{id}")
    public String deleteParentId(@PathVariable("id") Long id) {
        return parentService.deleteParentById(id);
    }
}
