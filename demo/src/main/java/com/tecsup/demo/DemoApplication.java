package com.tecsup.demo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Aplicación principal del sistema de gestión educativa.
 * 
 * Esta aplicación proporciona una API REST para la gestión de:
 * - Usuarios (estudiantes, profesores, administradores)
 * - Tareas educativas
 * - Entregas de tareas
 * - Calificaciones
 * 
 * @author Sistema Educativo
 * @version 2.0.0
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableTransactionManagement
@EnableAsync
@OpenAPIDefinition(
    info = @Info(
        title = "API de Sistema Educativo",
        version = "2.0.0",
        description = "API REST para gestión de tareas educativas, usuarios y entregas",
        contact = @Contact(
            name = "Equipo de Desarrollo",
            email = "desarrollo@tecsup.edu.pe",
            url = "https://www.tecsup.edu.pe"
        ),
        license = @License(
            name = "MIT License",
            url = "https://opensource.org/licenses/MIT"
        )
    )
)
public class DemoApplication {

    /**
     * Método principal que inicia la aplicación Spring Boot
     * 
     * @param args Argumentos de línea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("🚀 Sistema Educativo iniciado correctamente!");
        System.out.println("📚 API disponible en: http://localhost:8080");
        System.out.println("📖 Documentación Swagger en: http://localhost:8080/swagger-ui.html");
    }
}
