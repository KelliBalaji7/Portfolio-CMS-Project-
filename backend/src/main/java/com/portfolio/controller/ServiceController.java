package com.portfolio.controller;

import com.portfolio.model.ServiceEntity;
import com.portfolio.repository.ServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public ServiceEntity createService(@RequestBody ServiceEntity service) {
        return serviceRepository.save(service);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceEntity> updateService(@PathVariable Long id, @RequestBody ServiceEntity updated) {
        return serviceRepository.findById(id)
                .map(s -> {
                    s.setTitle(updated.getTitle());
                    s.setDescription(updated.getDescription());
                    s.setIcon(updated.getIcon());
                    return ResponseEntity.ok(serviceRepository.save(s));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        if (!serviceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        serviceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
