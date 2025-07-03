package com.tecsup.demo.repository;

import com.tecsup.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para operaciones de base de datos relacionadas con usuarios
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Busca un usuario por su nombre de usuario
     * 
     * @param username Nombre de usuario
     * @return Optional con el usuario si existe
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Busca un usuario por su email
     * 
     * @param email Email del usuario
     * @return Optional con el usuario si existe
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Busca usuarios por rol
     * 
     * @param role Rol de los usuarios
     * @return Lista de usuarios con el rol especificado
     */
    List<User> findByRole(User.UserRole role);
    
    /**
     * Busca usuarios por nombre o apellido (búsqueda parcial)
     * 
     * @param firstName Nombre a buscar
     * @param lastName Apellido a buscar
     * @return Lista de usuarios que contienen el nombre o apellido
     */
    List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);
    
    /**
     * Verifica si existe un usuario con el username especificado
     * 
     * @param username Nombre de usuario a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByUsername(String username);
    
    /**
     * Verifica si existe un usuario con el email especificado
     * 
     * @param email Email a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByEmail(String email);
    
    /**
     * Busca usuarios activos ordenados por apellido y nombre
     * 
     * @return Lista de usuarios ordenados por apellido y nombre
     */
    @Query("SELECT u FROM User u ORDER BY u.lastName ASC, u.firstName ASC")
    List<User> findAllOrderedByName();
    
    /**
     * Busca usuarios por rol ordenados por apellido y nombre
     * 
     * @param role Rol de los usuarios
     * @return Lista de usuarios con el rol especificado ordenados por nombre
     */
    @Query("SELECT u FROM User u WHERE u.role = :role ORDER BY u.lastName ASC, u.firstName ASC")
    List<User> findByRoleOrderedByName(@Param("role") User.UserRole role);
}
