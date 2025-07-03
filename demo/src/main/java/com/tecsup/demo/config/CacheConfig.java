package com.tecsup.demo.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Configuración de cache para mejorar el rendimiento de la aplicación
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * Configura el manager de cache usando Caffeine
     * 
     * @return CacheManager configurado
     */
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        
        // Configurar diferentes caches con diferentes configuraciones
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .maximumSize(500)                    // Máximo 500 entradas por cache
                .expireAfterWrite(10, TimeUnit.MINUTES)  // Expirar después de 10 minutos
                .expireAfterAccess(5, TimeUnit.MINUTES)  // Expirar después de 5 minutos sin acceso
                .recordStats());                     // Registrar estadísticas
        
        // Nombres de los caches disponibles
        cacheManager.setCacheNames(java.util.Arrays.asList(
                "users",      // Cache para usuarios
                "tasks",      // Cache para tareas
                "submissions" // Cache para entregas
        ));
        
        return cacheManager;
    }

    /**
     * Configuración específica para el cache de usuarios
     * 
     * @return Configuración de Caffeine para usuarios
     */
    @Bean
    public Caffeine<Object, Object> userCacheConfig() {
        return Caffeine.newBuilder()
                .maximumSize(200)                    // Menos entradas para usuarios
                .expireAfterWrite(15, TimeUnit.MINUTES)  // Más tiempo de vida
                .expireAfterAccess(10, TimeUnit.MINUTES);
    }

    /**
     * Configuración específica para el cache de tareas
     * 
     * @return Configuración de Caffeine para tareas
     */
    @Bean
    public Caffeine<Object, Object> taskCacheConfig() {
        return Caffeine.newBuilder()
                .maximumSize(100)                    // Menos entradas para tareas
                .expireAfterWrite(30, TimeUnit.MINUTES)  // Más tiempo de vida para tareas
                .expireAfterAccess(15, TimeUnit.MINUTES);
    }
} 