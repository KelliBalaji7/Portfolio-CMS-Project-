package com.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clientName;

    private String clientRole;

    private String company;

    @Column(length = 2000)
    private String feedback;

    private String avatarUrl;

    public Testimonial() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientRole() { return clientRole; }
    public void setClientRole(String clientRole) { this.clientRole = clientRole; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
