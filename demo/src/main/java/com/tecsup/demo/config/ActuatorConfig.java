package com.tecsup.demo.config;

import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Configuración de Actuator para monitoreo y métricas de la aplicación
 */
@Configuration
public class ActuatorConfig {

    /**
     * Contribuye información adicional al endpoint /actuator/info
     * 
     * @return InfoContributor con información de la aplicación
     */
    @Bean
    public InfoContributor applicationInfoContributor() {
        return new InfoContributor() {
            @Override
            public void contribute(Info.Builder builder) {
                Map<String, Object> details = new HashMap<>();
                details.put("application", "Sistema Educativo API");
                details.put("version", "2.0.0");
                details.put("description", "API REST para gestión educativa");
                details.put("startupTime", LocalDateTime.now().toString());
                details.put("environment", "Development");
                details.put("team", "Equipo de Desarrollo Tecsup");
                details.put("contact", "desarrollo@tecsup.edu.pe");
                
                builder.withDetail("app", details);
            }
        };
    }
} 