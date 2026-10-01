package com.portfolio.controller;

import com.portfolio.model.Skill;
import com.portfolio.repository.SkillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping
    public Skill createSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill updated) {
        return skillRepository.findById(id)
                .map(s -> {
                    s.setName(updated.getName());
                    s.setCategory(updated.getCategory());
                    s.setProficiency(updated.getProficiency());
                    return ResponseEntity.ok(skillRepository.save(s));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        if (!skillRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        skillRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
