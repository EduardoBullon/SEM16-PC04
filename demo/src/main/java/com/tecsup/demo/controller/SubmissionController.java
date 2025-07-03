package com.tecsup.demo.controller;

import com.tecsup.demo.dto.SubmissionDTO;
import com.tecsup.demo.entity.Submission;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.service.SubmissionService;
import com.tecsup.demo.service.TaskService;
import com.tecsup.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para operaciones relacionadas con entregas
 */
@RestController
@RequestMapping("/api/submissions")
@Tag(name = "Entregas", description = "Endpoints para gestión de entregas de tareas")
@CrossOrigin(origins = "*")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserService userService;
    private final TaskService taskService;

    public SubmissionController(SubmissionService submissionService, UserService userService, TaskService taskService) {
        this.submissionService = submissionService;
        this.userService = userService;
        this.taskService = taskService;
    }

    /**
     * Obtiene todas las entregas
     * 
     * @return Lista de todas las entregas
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    @Operation(summary = "Listar entregas", description = "Obtiene todas las entregas")
    public ResponseEntity<List<Submission>> listAll() {
        List<Submission> submissions = submissionService.listAll();
        return ResponseEntity.ok(submissions);
    }

    /**
     * Obtiene una entrega por su ID
     * 
     * @param id ID de la entrega
     * @return Entrega encontrada o 404 si no existe
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    @Operation(summary = "Obtener entrega", description = "Obtiene una entrega específica por su ID")
    public ResponseEntity<Submission> getById(@PathVariable Long id) {
        return submissionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Obtiene entregas por tarea
     * 
     * @param taskId ID de la tarea
     * @return Lista de entregas de la tarea especificada
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/task/{taskId}")
    @Operation(summary = "Entregas por tarea", description = "Obtiene todas las entregas de una tarea específica")
    public ResponseEntity<List<Submission>> getByTask(@PathVariable Long taskId) {
        return taskService.findById(taskId)
                .map(task -> ResponseEntity.ok(submissionService.findByTask(task)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Obtiene entregas por usuario
     * 
     * @param userId ID del usuario
     * @return Lista de entregas del usuario especificado
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user/{userId}")
    @Operation(summary = "Entregas por usuario", description = "Obtiene todas las entregas de un usuario específico")
    public ResponseEntity<List<Submission>> getByUser(@PathVariable Long userId) {
        return userService.findById(userId)
                .map(user -> ResponseEntity.ok(submissionService.findByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea una nueva entrega
     * 
     * @param dto Datos de la entrega a crear
     * @return Entrega creada
     */
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping
    @Operation(summary = "Crear entrega", description = "Crea una nueva entrega (solo estudiantes)")
    public ResponseEntity<?> create(@Valid @RequestBody SubmissionDTO dto) {
        try {
            User user = userService.findById(dto.getUserId()).orElse(null);
            Task task = taskService.findById(dto.getTaskId()).orElse(null);

            if (user == null || task == null) {
                return ResponseEntity.badRequest().body("Usuario o Tarea no encontrada");
            }

            // Verificar si ya existe una entrega para este usuario y tarea
            if (submissionService.existsByUserAndTask(user, task)) {
                return ResponseEntity.badRequest().body("Ya existe una entrega para esta tarea");
            }

            Submission submission = new Submission();
            submission.setSubmissionDate(dto.getSubmissionDate());
            submission.setStatus(dto.getStatus());
            submission.setGrade(dto.getGrade());
            submission.setComments(dto.getComments());
            submission.setFileUrl(dto.getFileUrl());
            submission.setFileName(dto.getFileName());
            submission.setFileSize(dto.getFileSize());
            submission.setUser(user);
            submission.setTask(task);

            Submission savedSubmission = submissionService.save(submission);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSubmission);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear la entrega: " + e.getMessage());
        }
    }

    /**
     * Actualiza una entrega existente
     * 
     * @param id ID de la entrega a actualizar
     * @param dto Nuevos datos de la entrega
     * @return Entrega actualizada o 404 si no existe
     */
    @PreAuthorize("hasAnyRole('STUDENT', 'PROFESSOR')")
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar entrega", description = "Actualiza una entrega existente (estudiantes y profesores)")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody SubmissionDTO dto) {
        return submissionService.findById(id)
                .map(existing -> {
                    try {
                        User user = userService.findById(dto.getUserId()).orElse(null);
                        Task task = taskService.findById(dto.getTaskId()).orElse(null);

                        if (user == null || task == null) {
                            return ResponseEntity.badRequest().body("Usuario o Tarea no encontrada");
                        }

                        existing.setSubmissionDate(dto.getSubmissionDate());
                        existing.setStatus(dto.getStatus());
                        existing.setGrade(dto.getGrade());
                        existing.setComments(dto.getComments());
                        existing.setFileUrl(dto.getFileUrl());
                        existing.setFileName(dto.getFileName());
                        existing.setFileSize(dto.getFileSize());
                        existing.setUser(user);
                        existing.setTask(task);

                        return ResponseEntity.ok(submissionService.save(existing));
                    } catch (Exception e) {
                        return ResponseEntity.badRequest().body("Error al actualizar la entrega: " + e.getMessage());
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina una entrega
     * 
     * @param id ID de la entrega a eliminar
     * @return 204 si se eliminó correctamente o 404 si no existe
     */
    @PreAuthorize("hasRole('STUDENT')")
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar entrega", description = "Elimina una entrega (solo estudiantes)")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (submissionService.findById(id).isPresent()) {
            submissionService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Obtiene entregas por estado
     * 
     * @param status Estado de las entregas
     * @return Lista de entregas con el estado especificado
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/status/{status}")
    @Operation(summary = "Entregas por estado", description = "Obtiene entregas filtradas por estado")
    public ResponseEntity<List<Submission>> getByStatus(@PathVariable Submission.SubmissionStatus status) {
        List<Submission> submissions = submissionService.findByStatus(status);
        return ResponseEntity.ok(submissions);
    }
}
