package com.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "blogs")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String slug;

    @Column(length = 1000)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author;

    private LocalDate publishedDate;

    private String tags;

    public Blog() {
        this.publishedDate = LocalDate.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public LocalDate getPublishedDate() { return publishedDate; }
    public void setPublishedDate(LocalDate publishedDate) { this.publishedDate = publishedDate; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
}
