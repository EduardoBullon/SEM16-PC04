package com.tecsup.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Configuración de la base de datos y JPA
 */
@Configuration
@EnableJpaRepositories(basePackages = "com.tecsup.demo.repository")
@EnableJpaAuditing
@EnableTransactionManagement
public class DatabaseConfig {

    /**
     * Configuración adicional para JPA/Hibernate
     * Esta configuración se complementa con las propiedades en application.properties
     */
    
    // La configuración principal se maneja en application.properties
    // Aquí se pueden agregar configuraciones adicionales si es necesario
    
} 