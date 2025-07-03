package com.tecsup.demo.controller;

import com.tecsup.demo.dto.UserDTO;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para operaciones relacionadas con usuarios
 */
@RestController
@RequestMapping("/api/users")
@Tag(name = "Usuarios", description = "Endpoints para gestión de usuarios")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Obtiene todos los usuarios (solo administradores)
     * 
     * @return Lista de todos los usuarios
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    @Operation(summary = "Listar usuarios", description = "Obtiene todos los usuarios (solo administradores)")
    public ResponseEntity<List<User>> listAll() {
        List<User> users = userService.listAll();
        return ResponseEntity.ok(users);
    }

    /**
     * Obtiene un usuario por su ID (solo administradores)
     * 
     * @param id ID del usuario
     * @return Usuario encontrado o 404 si no existe
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario", description = "Obtiene un usuario específico por su ID (solo administradores)")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuevo usuario
     * 
     * @param dto Datos del usuario a crear
     * @return Usuario creado
     */
    @PostMapping
    @Operation(summary = "Crear usuario", description = "Crea un nuevo usuario")
    public ResponseEntity<User> create(@Valid @RequestBody UserDTO dto) {
        try {
            // Verificar si el username ya existe
            if (userService.findByUsername(dto.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().build();
            }

            // Verificar si el email ya existe
            if (userService.findByEmail(dto.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().build();
            }

            User user = new User();
            user.setUsername(dto.getUsername());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
            user.setEmail(dto.getEmail());
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setPhone(dto.getPhone());
            user.setRole(dto.getRole());

            User savedUser = userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Actualiza un usuario existente (solo administradores)
     * 
     * @param id ID del usuario a actualizar
     * @param dto Nuevos datos del usuario
     * @return Usuario actualizado o 404 si no existe
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar usuario", description = "Actualiza un usuario existente (solo administradores)")
    public ResponseEntity<User> update(@PathVariable Long id, @Valid @RequestBody UserDTO dto) {
        return userService.findById(id)
                .map(user -> {
                    // Verificar si el username ya existe en otro usuario
                    userService.findByUsername(dto.getUsername())
                            .filter(existingUser -> !existingUser.getId().equals(id))
                            .ifPresent(existingUser -> {
                                throw new RuntimeException("Username ya existe");
                            });

                    // Verificar si el email ya existe en otro usuario
                    userService.findByEmail(dto.getEmail())
                            .filter(existingUser -> !existingUser.getId().equals(id))
                            .ifPresent(existingUser -> {
                                throw new RuntimeException("Email ya existe");
                            });

                    user.setUsername(dto.getUsername());
                    if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
                        user.setPassword(passwordEncoder.encode(dto.getPassword()));
                    }
                    user.setEmail(dto.getEmail());
                    user.setFirstName(dto.getFirstName());
                    user.setLastName(dto.getLastName());
                    user.setPhone(dto.getPhone());
                    user.setRole(dto.getRole());

                    return ResponseEntity.ok(userService.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina un usuario (solo administradores)
     * 
     * @param id ID del usuario a eliminar
     * @return 204 si se eliminó correctamente o 404 si no existe
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario", description = "Elimina un usuario (solo administradores)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (userService.findById(id).isPresent()) {
            userService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Obtiene el usuario actual autenticado
     * 
     * @param user Usuario autenticado
     * @return Usuario actual
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    @Operation(summary = "Usuario actual", description = "Obtiene el usuario actual autenticado")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    /**
     * Busca usuarios por rol
     * 
     * @param role Rol de los usuarios a buscar
     * @return Lista de usuarios con el rol especificado
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/role/{role}")
    @Operation(summary = "Usuarios por rol", description = "Obtiene usuarios filtrados por rol (solo administradores)")
    public ResponseEntity<List<User>> getByRole(@PathVariable User.UserRole role) {
        List<User> users = userService.findByRole(role);
        return ResponseEntity.ok(users);
    }
}
