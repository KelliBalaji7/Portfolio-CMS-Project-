package com.portfolio.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload");
        }

        try {
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFilename = UUID.randomUUID().toString() + extension;
            Path targetLocation = Paths.get(uploadDir).resolve(newFilename);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = "/api/files/" + newFilename;
            Map<String, String> response = new HashMap<>();
            response.put("fileName", newFilename);
            response.put("originalName", originalFilename);
            response.put("fileUrl", fileDownloadUri);

            return ResponseEntity.ok(response);

        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body("Could not upload file: " + ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listFiles() {
        try {
            File dir = new File(uploadDir);
            if (!dir.exists() || !dir.isDirectory()) {
                return ResponseEntity.ok(java.util.Collections.emptyList());
            }

            File[] files = dir.listFiles();
            if (files == null) {
                return ResponseEntity.ok(java.util.Collections.emptyList());
            }

            java.util.List<Map<String, Object>> fileList = new java.util.ArrayList<>();
            for (File f : files) {
                if (f.isFile()) {
                    Map<String, Object> info = new HashMap<>();
                    info.put("name", f.getName());
                    info.put("size", (f.length() / 1024) + " KB");
                    info.put("fileUrl", "/api/files/" + f.getName());
                    info.put("lastModified", f.lastModified());
                    fileList.add(info);
                }
            }
            return ResponseEntity.ok(fileList);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body("Could not list files: " + ex.getMessage());
        }
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                String contentType = "application/octet-stream";
                try {
                    contentType = Files.probeContentType(filePath);
                } catch (IOException ignored) {}

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{fileName:.+}")
    public ResponseEntity<?> deleteFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return ResponseEntity.ok(Map.of("message", "File deleted successfully", "fileName", fileName));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body("Could not delete file: " + ex.getMessage());
        }
    }
}
