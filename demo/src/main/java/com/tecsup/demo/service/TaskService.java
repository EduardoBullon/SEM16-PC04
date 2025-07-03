package com.tecsup.demo.service;

import com.tecsup.demo.entity.Task;
import com.tecsup.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para operaciones relacionadas con tareas
 */
@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Obtiene todas las tareas
     * 
     * @return Lista de todas las tareas
     */
    public List<Task> listAll() {
        return taskRepository.findAll();
    }

    /**
     * Busca una tarea por su ID
     * 
     * @param id ID de la tarea
     * @return Optional con la tarea si existe
     */
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    /**
     * Guarda una tarea (crea o actualiza)
     * 
     * @param task Tarea a guardar
     * @return Tarea guardada
     */
    public Task save(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Elimina una tarea por su ID
     * 
     * @param id ID de la tarea a eliminar
     */
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    /**
     * Busca tareas por estado
     * 
     * @param status Estado de las tareas
     * @return Lista de tareas con el estado especificado
     */
    public List<Task> findByStatus(Task.TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    /**
     * Busca tareas activas
     * 
     * @return Lista de tareas activas
     */
    public List<Task> findActiveTasks() {
        return taskRepository.findByStatus(Task.TaskStatus.ACTIVE);
    }

    /**
     * Busca tareas que vencen después de una fecha específica
     * 
     * @param date Fecha límite
     * @return Lista de tareas que vencen después de la fecha
     */
    public List<Task> findTasksDueAfter(LocalDateTime date) {
        return taskRepository.findByDueDateAfter(date);
    }

    /**
     * Busca tareas que vencen antes de una fecha específica
     * 
     * @param date Fecha límite
     * @return Lista de tareas que vencen antes de la fecha
     */
    public List<Task> findTasksDueBefore(LocalDateTime date) {
        return taskRepository.findByDueDateBefore(date);
    }
}
