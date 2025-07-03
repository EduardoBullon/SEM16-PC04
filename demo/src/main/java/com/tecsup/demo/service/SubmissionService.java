package com.tecsup.demo.service;

import com.tecsup.demo.entity.Submission;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para operaciones relacionadas con entregas
 */
@Service
@Transactional
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    /**
     * Obtiene todas las entregas
     * 
     * @return Lista de todas las entregas
     */
    public List<Submission> listAll() {
        return submissionRepository.findAll();
    }

    /**
     * Busca una entrega por su ID
     * 
     * @param id ID de la entrega
     * @return Optional con la entrega si existe
     */
    public Optional<Submission> findById(Long id) {
        return submissionRepository.findById(id);
    }

    /**
     * Busca una entrega por tarea y usuario
     * 
     * @param task Tarea
     * @param user Usuario
     * @return Optional con la entrega si existe
     */
    public Optional<Submission> findByTaskAndUser(Task task, User user) {
        return submissionRepository.findByTaskAndUser(task, user);
    }

    /**
     * Verifica si existe una entrega para un usuario y tarea específicos
     * 
     * @param user Usuario
     * @param task Tarea
     * @return true si existe, false en caso contrario
     */
    public boolean existsByUserAndTask(User user, Task task) {
        return submissionRepository.existsByTaskAndUser(task, user);
    }

    /**
     * Busca entregas por usuario
     * 
     * @param user Usuario
     * @return Lista de entregas del usuario
     */
    public List<Submission> findByUser(User user) {
        return submissionRepository.findByUser(user);
    }

    /**
     * Busca entregas por tarea
     * 
     * @param task Tarea
     * @return Lista de entregas de la tarea
     */
    public List<Submission> findByTask(Task task) {
        return submissionRepository.findByTask(task);
    }

    /**
     * Guarda una entrega (crea o actualiza)
     * 
     * @param submission Entrega a guardar
     * @return Entrega guardada
     */
    public Submission save(Submission submission) {
        return submissionRepository.save(submission);
    }

    /**
     * Elimina una entrega por su ID
     * 
     * @param id ID de la entrega a eliminar
     */
    public void delete(Long id) {
        submissionRepository.deleteById(id);
    }

    /**
     * Busca entregas por estado
     * 
     * @param status Estado de las entregas
     * @return Lista de entregas con el estado especificado
     */
    public List<Submission> findByStatus(Submission.SubmissionStatus status) {
        return submissionRepository.findByStatus(status);
    }

    /**
     * Busca entregas calificadas
     * 
     * @return Lista de entregas calificadas
     */
    public List<Submission> findGradedSubmissions() {
        return submissionRepository.findByStatus(Submission.SubmissionStatus.GRADED);
    }

    /**
     * Busca entregas pendientes
     * 
     * @return Lista de entregas pendientes
     */
    public List<Submission> findPendingSubmissions() {
        return submissionRepository.findByStatus(Submission.SubmissionStatus.PENDING);
    }

    /**
     * Busca entregas tardías
     * 
     * @return Lista de entregas tardías
     */
    public List<Submission> findLateSubmissions() {
        return submissionRepository.findByStatus(Submission.SubmissionStatus.LATE);
    }

    /**
     * Busca entregas en un rango de fechas
     * 
     * @param startDate Fecha de inicio
     * @param endDate Fecha de fin
     * @return Lista de entregas en el rango especificado
     */
    public List<Submission> findSubmissionsBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return submissionRepository.findBySubmissionDateBetween(startDate, endDate);
    }

    /**
     * Calcula el promedio de calificaciones de un usuario
     * 
     * @param user Usuario
     * @return Promedio de calificaciones
     */
    public Double calculateAverageGradeForUser(User user) {
        return submissionRepository.calculateAverageGradeByUser(user);
    }

    /**
     * Calcula el promedio de calificaciones de una tarea
     * 
     * @param task Tarea
     * @return Promedio de calificaciones
     */
    public Double calculateAverageGradeForTask(Task task) {
        return submissionRepository.calculateAverageGradeByTask(task);
    }
}
