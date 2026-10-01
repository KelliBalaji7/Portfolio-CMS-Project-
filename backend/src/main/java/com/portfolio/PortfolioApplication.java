package com.portfolio;

import com.portfolio.model.User;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import com.portfolio.model.Experience;
import com.portfolio.repository.UserRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import com.portfolio.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            ExperienceRepository experienceRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.username:admin}") String adminUsername,
            @Value("${app.admin.password:admin123}") String adminPassword) {
        return args -> {
            // Seed Admin User if not present
            if (userRepository.findByUsername(adminUsername).isEmpty()) {
                User admin = new User();
                admin.setUsername(adminUsername);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                System.out.println("Default admin user initialized: " + adminUsername);
            }

            // Seed Initial Portfolio Data if empty
            if (projectRepository.count() == 0) {
                Project p1 = new Project();
                p1.setTitle("Data-Driven Fraud Detection in FinTech");
                p1.setDescription("Machine-learning based system to identify suspicious financial transactions, with data processing, feature engineering and an interactive monitoring dashboard.");
                p1.setTags("Java, Python, Machine Learning, MySQL, Pandas");
                p1.setFeatured(true);
                p1.setGithubUrl("https://github.com/KelliBalaji7");
                projectRepository.save(p1);

                Project p2 = new Project();
                p2.setTitle("Portfolio Project with Custom CMS");
                p2.setDescription("A full-stack portfolio platform where projects, skills, experience, blogs, testimonials and services can be managed from a custom admin dashboard.");
                p2.setTags("React, Spring Boot, PostgreSQL, JWT");
                p2.setFeatured(true);
                p2.setGithubUrl("https://github.com/KelliBalaji7/Portfolio-CMS-Project-");
                projectRepository.save(p2);
            }

            if (skillRepository.count() == 0) {
                String[] defaultSkills = {"Java", "Spring Boot", "React", "HTML5", "CSS3", "Bootstrap", "Python", "C", "MySQL", "PostgreSQL", "Git", "GitHub", "DSA"};
                for (String s : defaultSkills) {
                    Skill skill = new Skill();
                    skill.setName(s);
                    skill.setCategory("Development");
                    skill.setProficiency(90);
                    skillRepository.save(skill);
                }
            }

            if (experienceRepository.count() == 0) {
                Experience exp = new Experience();
                exp.setCompany("CodSoft-IT Services");
                exp.setRole("Java Programmer Intern");
                exp.setLocation("Remote");
                exp.setDuration("Apr 2026 – May 2026");
                exp.setDescription("Developed Java applications using OOP, collections and file handling; solved DSA problems; tested, debugged and optimized applications while following software-development best practices.");
                experienceRepository.save(exp);
            }
        };
    }
}
