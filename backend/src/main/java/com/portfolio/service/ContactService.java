package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer managing contact inquiries submitted through the portfolio.
 */
@Service
@Transactional
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage submitMessage(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public List<ContactMessage> findAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<ContactMessage> markAsRead(Long id) {
        return contactMessageRepository.findById(id).map(msg -> {
            msg.setReadStatus(true);
            return contactMessageRepository.save(msg);
        });
    }

    public boolean deleteMessage(Long id) {
        if (contactMessageRepository.existsById(id)) {
            contactMessageRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
