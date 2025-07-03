package com.tecsup.demo.repository;

import com.tecsup.demo.entity.Submission;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para operaciones de base de datos relacionadas con entregas
 */
@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    /**
     * Busca una entrega por tarea y usuario
     * 
     * @param task Tarea
     * @param user Usuario
     * @return Optional con la entrega si existe
     */
    Optional<Submission> findByTaskAndUser(Task task, User user);

    /**
     * Verifica si existe una entrega para una tarea y usuario específicos
     * 
     * @param task Tarea
     * @param user Usuario
     * @return true si existe, false en caso contrario
     */
    boolean existsByTaskAndUser(Task task, User user);

    /**
     * Busca entregas por usuario
     * 
     * @param user Usuario
     * @return Lista de entregas del usuario
     */
    List<Submission> findByUser(User user);

    /**
     * Busca entregas por tarea
     * 
     * @param task Tarea
     * @return Lista de entregas de la tarea
     */
    List<Submission> findByTask(Task task);

    /**
     * Busca entregas por estado
     * 
     * @param status Estado de las entregas
     * @return Lista de entregas con el estado especificado
     */
    List<Submission> findByStatus(Submission.SubmissionStatus status);

    /**
     * Busca entregas en un rango de fechas
     * 
     * @param startDate Fecha de inicio
     * @param endDate Fecha de fin
     * @return Lista de entregas en el rango especificado
     */
    List<Submission> findBySubmissionDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    /**
     * Busca entregas ordenadas por fecha de entrega (más recientes primero)
     * 
     * @return Lista de entregas ordenadas por fecha
     */
    @Query("SELECT s FROM Submission s ORDER BY s.submissionDate DESC")
    List<Submission> findAllOrderedBySubmissionDate();

    /**
     * Busca entregas de un usuario ordenadas por fecha de entrega
     * 
     * @param user Usuario
     * @return Lista de entregas del usuario ordenadas por fecha
     */
    @Query("SELECT s FROM Submission s WHERE s.user = :user ORDER BY s.submissionDate DESC")
    List<Submission> findByUserOrderedBySubmissionDate(@Param("user") User user);

    /**
     * Busca entregas de una tarea ordenadas por fecha de entrega
     * 
     * @param task Tarea
     * @return Lista de entregas de la tarea ordenadas por fecha
     */
    @Query("SELECT s FROM Submission s WHERE s.task = :task ORDER BY s.submissionDate DESC")
    List<Submission> findByTaskOrderedBySubmissionDate(@Param("task") Task task);

    /**
     * Calcula el promedio de calificaciones de un usuario
     * 
     * @param user Usuario
     * @return Promedio de calificaciones
     */
    @Query("SELECT AVG(s.grade) FROM Submission s WHERE s.user = :user AND s.grade IS NOT NULL")
    Double calculateAverageGradeByUser(@Param("user") User user);

    /**
     * Calcula el promedio de calificaciones de una tarea
     * 
     * @param task Tarea
     * @return Promedio de calificaciones
     */
    @Query("SELECT AVG(s.grade) FROM Submission s WHERE s.task = :task AND s.grade IS NOT NULL")
    Double calculateAverageGradeByTask(@Param("task") Task task);

    /**
     * Cuenta las entregas de un usuario
     * 
     * @param user Usuario
     * @return Número de entregas del usuario
     */
    @Query("SELECT COUNT(s) FROM Submission s WHERE s.user = :user")
    Long countByUser(@Param("user") User user);

    /**
     * Cuenta las entregas de una tarea
     * 
     * @param task Tarea
     * @return Número de entregas de la tarea
     */
    @Query("SELECT COUNT(s) FROM Submission s WHERE s.task = :task")
    Long countByTask(@Param("task") Task task);
}
