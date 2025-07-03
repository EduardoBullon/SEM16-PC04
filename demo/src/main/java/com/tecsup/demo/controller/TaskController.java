package com.tecsup.demo.controller;

import com.tecsup.demo.dto.TaskDTO;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para operaciones relacionadas con tareas
 */
@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Tareas", description = "Endpoints para gestión de tareas educativas")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Obtiene todas las tareas disponibles
     * 
     * @return Lista de todas las tareas
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    @Operation(summary = "Listar tareas", description = "Obtiene todas las tareas disponibles")
    public ResponseEntity<List<Task>> listAll() {
        List<Task> tasks = taskService.listAll();
        return ResponseEntity.ok(tasks);
    }

    /**
     * Obtiene una tarea por su ID
     * 
     * @param id ID de la tarea
     * @return Tarea encontrada o 404 si no existe
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    @Operation(summary = "Obtener tarea", description = "Obtiene una tarea específica por su ID")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        return taskService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea una nueva tarea
     * 
     * @param dto Datos de la tarea a crear
     * @return Tarea creada
     */
    @PreAuthorize("hasRole('PROFESSOR')")
    @PostMapping
    @Operation(summary = "Crear tarea", description = "Crea una nueva tarea (solo profesores)")
    public ResponseEntity<Task> create(@Valid @RequestBody TaskDTO dto) {
        try {
            Task task = new Task();
            task.setTitle(dto.getTitle());
            task.setDescription(dto.getDescription());
            task.setPublicationDate(dto.getPublicationDate());
            task.setDueDate(dto.getDueDate());
            task.setStatus(dto.getStatus());
            task.setMaxGrade(dto.getMaxGrade());
            
            Task savedTask = taskService.save(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Actualiza una tarea existente
     * 
     * @param id ID de la tarea a actualizar
     * @param dto Nuevos datos de la tarea
     * @return Tarea actualizada o 404 si no existe
     */
    @PreAuthorize("hasRole('PROFESSOR')")
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar tarea", description = "Actualiza una tarea existente (solo profesores)")
    public ResponseEntity<Task> update(@PathVariable Long id, @Valid @RequestBody TaskDTO dto) {
        return taskService.findById(id)
                .map(task -> {
                    task.setTitle(dto.getTitle());
                    task.setDescription(dto.getDescription());
                    task.setPublicationDate(dto.getPublicationDate());
                    task.setDueDate(dto.getDueDate());
                    task.setStatus(dto.getStatus());
                    task.setMaxGrade(dto.getMaxGrade());
                    
                    return ResponseEntity.ok(taskService.save(task));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina una tarea
     * 
     * @param id ID de la tarea a eliminar
     * @return 204 si se eliminó correctamente o 404 si no existe
     */
    @PreAuthorize("hasRole('PROFESSOR')")
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar tarea", description = "Elimina una tarea (solo profesores)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (taskService.findById(id).isPresent()) {
            taskService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Obtiene tareas por estado
     * 
     * @param status Estado de las tareas a buscar
     * @return Lista de tareas con el estado especificado
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/status/{status}")
    @Operation(summary = "Tareas por estado", description = "Obtiene tareas filtradas por estado")
    public ResponseEntity<List<Task>> getByStatus(@PathVariable Task.TaskStatus status) {
        List<Task> tasks = taskService.findByStatus(status);
        return ResponseEntity.ok(tasks);
    }
}
