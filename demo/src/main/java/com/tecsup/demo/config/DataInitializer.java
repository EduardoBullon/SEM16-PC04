package com.tecsup.demo.config;

import com.tecsup.demo.entity.User;
import com.tecsup.demo.repository.UserRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Componente para inicializar datos de prueba en la aplicación
 * Se ejecuta automáticamente cuando la aplicación está lista
 */
@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Inicializa usuarios de prueba cuando la aplicación está lista
     * Se ejecuta automáticamente al arrancar la aplicación
     */
    @EventListener(ApplicationReadyEvent.class)
    public void initUsers() {
        System.out.println("🚀 Inicializando datos de prueba...");
        
        // Crear usuario administrador
        createUserIfNotExists(
                "admin", 
                "admin123", 
                "admin@tecsup.edu.pe", 
                "Administrador", 
                "Sistema", 
                "+51999111222", 
                User.UserRole.ADMIN
        );
        
        // Crear usuario profesor
        createUserIfNotExists(
                "profesor", 
                "profesor123", 
                "profesor@tecsup.edu.pe", 
                "Ricardo", 
                "Coello", 
                "+51999222333", 
                User.UserRole.PROFESSOR
        );
        
        // Crear usuario estudiante
        createUserIfNotExists(
                "estudiante", 
                "estudiante123", 
                "estudiante@tecsup.edu.pe", 
                "Alvaro", 
                "Bueno", 
                "+51999333444", 
                User.UserRole.STUDENT
        );
        
        System.out.println("✅ Datos de prueba inicializados correctamente");
        System.out.println("📋 Usuarios disponibles:");
        System.out.println("   👤 Admin: admin / admin123");
        System.out.println("   👨‍🏫 Profesor: profesor / profesor123");
        System.out.println("   👨‍🎓 Estudiante: estudiante / estudiante123");
    }

    /**
     * Crea un usuario si no existe en la base de datos
     * 
     * @param username Nombre de usuario
     * @param rawPassword Contraseña en texto plano (se encriptará)
     * @param email Correo electrónico
     * @param firstName Nombre
     * @param lastName Apellido
     * @param phone Teléfono
     * @param role Rol del usuario
     */
    private void createUserIfNotExists(String username, String rawPassword, String email, String firstName,
                                       String lastName, String phone, User.UserRole role) {

        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setEmail(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setPhone(phone);
            user.setRole(role);
            
            userRepository.save(user);
            System.out.println("   ✅ Usuario creado: " + username + " (" + role.getDisplayName() + ")");
        } else {
            System.out.println("   ℹ️  Usuario ya existe: " + username);
        }
    }
}
