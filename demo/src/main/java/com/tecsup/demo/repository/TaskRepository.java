package com.tecsup.demo.repository;

import com.tecsup.demo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repositorio para operaciones de base de datos relacionadas con tareas
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * Busca tareas por estado
     * 
     * @param status Estado de las tareas
     * @return Lista de tareas con el estado especificado
     */
    List<Task> findByStatus(Task.TaskStatus status);
    
    /**
     * Busca tareas que vencen después de una fecha específica
     * 
     * @param date Fecha límite
     * @return Lista de tareas que vencen después de la fecha
     */
    List<Task> findByDueDateAfter(LocalDateTime date);
    
    /**
     * Busca tareas que vencen antes de una fecha específica
     * 
     * @param date Fecha límite
     * @return Lista de tareas que vencen antes de la fecha
     */
    List<Task> findByDueDateBefore(LocalDateTime date);
    
    /**
     * Busca tareas por título (búsqueda parcial)
     * 
     * @param title Título a buscar
     * @return Lista de tareas que contienen el título
     */
    List<Task> findByTitleContainingIgnoreCase(String title);
    
    /**
     * Busca tareas activas ordenadas por fecha de vencimiento
     * 
     * @return Lista de tareas activas ordenadas por fecha de vencimiento
     */
    @Query("SELECT t FROM Task t WHERE t.status = 'ACTIVE' ORDER BY t.dueDate ASC")
    List<Task> findActiveTasksOrderedByDueDate();
    
    /**
     * Busca tareas que vencen en un rango de fechas
     * 
     * @param startDate Fecha de inicio
     * @param endDate Fecha de fin
     * @return Lista de tareas que vencen en el rango especificado
     */
    @Query("SELECT t FROM Task t WHERE t.dueDate BETWEEN :startDate AND :endDate")
    List<Task> findTasksDueBetween(@Param("startDate") LocalDateTime startDate, 
                                   @Param("endDate") LocalDateTime endDate);
}
