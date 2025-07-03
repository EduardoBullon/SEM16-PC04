package com.tecsup.demo.service;

import com.tecsup.demo.entity.User;
import com.tecsup.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para operaciones relacionadas con usuarios
 */
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Obtiene todos los usuarios
     * 
     * @return Lista de todos los usuarios
     */
    public List<User> listAll() {
        return userRepository.findAll();
    }

    /**
     * Busca un usuario por su ID
     * 
     * @param id ID del usuario
     * @return Optional con el usuario si existe
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Busca un usuario por su nombre de usuario
     * 
     * @param username Nombre de usuario
     * @return Optional con el usuario si existe
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Busca un usuario por su email
     * 
     * @param email Email del usuario
     * @return Optional con el usuario si existe
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Guarda un usuario (crea o actualiza)
     * 
     * @param user Usuario a guardar
     * @return Usuario guardado
     */
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Elimina un usuario por su ID
     * 
     * @param id ID del usuario a eliminar
     */
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Busca usuarios por rol
     * 
     * @param role Rol de los usuarios
     * @return Lista de usuarios con el rol especificado
     */
    public List<User> findByRole(User.UserRole role) {
        return userRepository.findByRole(role);
    }

    /**
     * Busca usuarios por nombre o apellido (búsqueda parcial)
     * 
     * @param name Nombre o apellido a buscar
     * @return Lista de usuarios que contienen el nombre
     */
    public List<User> findByNameContainingIgnoreCase(String name) {
        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name);
    }

    /**
     * Verifica si existe un usuario con el username especificado
     * 
     * @param username Nombre de usuario a verificar
     * @return true si existe, false en caso contrario
     */
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Verifica si existe un usuario con el email especificado
     * 
     * @param email Email a verificar
     * @return true si existe, false en caso contrario
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
