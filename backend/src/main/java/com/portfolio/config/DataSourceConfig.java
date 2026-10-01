package com.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DataSourceConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    @Primary
    public DataSource dataSource(
            @Value("${spring.datasource.url:}") String springUrl,
            @Value("${spring.datasource.username:postgres}") String defaultUser,
            @Value("${spring.datasource.password:postgres}") String defaultPassword,
            @Value("${spring.datasource.driver-class-name:org.postgresql.Driver}") String driverClass) {

        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            try {
                String cleanUrl = databaseUrl.trim();
                if (cleanUrl.startsWith("postgres://") || cleanUrl.startsWith("postgresql://")) {
                    URI uri = new URI(cleanUrl);
                    String userInfo = uri.getUserInfo();
                    String username = defaultUser;
                    String password = defaultPassword;

                    if (userInfo != null && userInfo.contains(":")) {
                        String[] parts = userInfo.split(":", 2);
                        username = parts[0];
                        password = parts[1];
                    }

                    int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                    String host = uri.getHost();
                    String path = uri.getPath();

                    String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path + "?sslmode=require";

                    return DataSourceBuilder.create()
                            .url(jdbcUrl)
                            .username(username)
                            .password(password)
                            .driverClassName("org.postgresql.Driver")
                            .build();
                } else if (cleanUrl.startsWith("jdbc:")) {
                    return DataSourceBuilder.create()
                            .url(cleanUrl)
                            .username(defaultUser)
                            .password(defaultPassword)
                            .driverClassName(driverClass)
                            .build();
                }
            } catch (URISyntaxException e) {
                System.err.println("Could not parse DATABASE_URL as URI, falling back to default: " + e.getMessage());
            }
        }

        // Standard configuration fallback
        return DataSourceBuilder.create()
                .url(springUrl)
                .username(defaultUser)
                .password(defaultPassword)
                .driverClassName(driverClass)
                .build();
    }
}
