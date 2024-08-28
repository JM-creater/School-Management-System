package com.example.SCHMGMT_SVR.functions.parent.controller;

import com.example.SCHMGMT_SVR.functions.parent.dto.ParentCreateDto;
import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.functions.parent.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/parent")
@RestController
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
