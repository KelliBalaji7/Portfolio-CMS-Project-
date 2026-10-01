package com.portfolio.controller;

import com.portfolio.model.Testimonial;
import com.portfolio.repository.TestimonialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialRepository testimonialRepository;

    public TestimonialController(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @GetMapping
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    @PostMapping
    public Testimonial createTestimonial(@RequestBody Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial updated) {
        return testimonialRepository.findById(id)
                .map(t -> {
                    t.setClientName(updated.getClientName());
                    t.setClientRole(updated.getClientRole());
                    t.setCompany(updated.getCompany());
                    t.setFeedback(updated.getFeedback());
                    t.setAvatarUrl(updated.getAvatarUrl());
                    return ResponseEntity.ok(testimonialRepository.save(t));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        if (!testimonialRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        testimonialRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
