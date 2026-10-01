package com.portfolio.controller;

import com.portfolio.model.Experience;
import com.portfolio.repository.ExperienceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    public ExperienceController(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return experienceRepository.save(experience);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience updated) {
        return experienceRepository.findById(id)
                .map(e -> {
                    e.setCompany(updated.getCompany());
                    e.setRole(updated.getRole());
                    e.setLocation(updated.getLocation());
                    e.setDuration(updated.getDuration());
                    e.setDescription(updated.getDescription());
                    return ResponseEntity.ok(experienceRepository.save(e));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        if (!experienceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        experienceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
