package com.portfolio.controller;

import com.portfolio.model.Blog;
import com.portfolio.repository.BlogRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogRepository blogRepository;

    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return blogRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogRepository.save(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog updated) {
        return blogRepository.findById(id)
                .map(b -> {
                    b.setTitle(updated.getTitle());
                    b.setSlug(updated.getSlug());
                    b.setSummary(updated.getSummary());
                    b.setContent(updated.getContent());
                    b.setAuthor(updated.getAuthor());
                    b.setTags(updated.getTags());
                    return ResponseEntity.ok(blogRepository.save(b));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        if (!blogRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        blogRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
