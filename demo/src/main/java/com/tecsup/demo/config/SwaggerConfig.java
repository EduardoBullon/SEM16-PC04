package com.tecsup.demo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de Swagger/OpenAPI para la documentación de la API
 */
@Configuration
public class SwaggerConfig {

    /**
     * Configura la documentación de la API con Swagger/OpenAPI
     * 
     * @return Configuración de OpenAPI
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sistema Educativo API")
                        .version("2.0.0")
                        .description("API REST completa para gestión de usuarios, tareas educativas, entregas y calificaciones. " +
                                "Desarrollado con Spring Boot 3.x y las mejores prácticas de desarrollo.")
                        .contact(new Contact()
                                .name("Equipo de Desarrollo Tecsup")
                                .email("desarrollo@tecsup.edu.pe")
                                .url("https://www.tecsup.edu.pe"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de desarrollo"),
                        new Server()
                                .url("https://api.tecsup.edu.pe")
                                .description("Servidor de producción")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
    }

    /**
     * Crea el esquema de seguridad para JWT
     * 
     * @return Esquema de seguridad
     */
    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer")
                .description("JWT token obtenido del endpoint de autenticación");
    }
} 