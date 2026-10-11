package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer managing business logic for portfolio projects.
 */
@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Project> findFeatured() {
        return projectRepository.findByFeaturedTrue();
    }

    @Transactional(readOnly = true)
    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    public Project create(Project project) {
        return projectRepository.save(project);
    }

    public Optional<Project> update(Long id, Project updated) {
        return projectRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setDescription(updated.getDescription());
            existing.setTags(updated.getTags());
            existing.setProjectUrl(updated.getProjectUrl());
            existing.setGithubUrl(updated.getGithubUrl());
            existing.setImageUrl(updated.getImageUrl());
            existing.setFeatured(updated.isFeatured());
            return projectRepository.save(existing);
        });
    }

    public boolean deleteById(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
