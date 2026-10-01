package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactMessage message) {
        ContactMessage saved = contactMessageRepository.save(message);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ContactMessage> markAsRead(@PathVariable Long id) {
        return contactMessageRepository.findById(id)
                .map(msg -> {
                    msg.setReadStatus(true);
                    return ResponseEntity.ok(contactMessageRepository.save(msg));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        if (!contactMessageRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        contactMessageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
