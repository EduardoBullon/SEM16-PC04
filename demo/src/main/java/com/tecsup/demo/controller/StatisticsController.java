package com.tecsup.demo.controller;

import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.service.SubmissionService;
import com.tecsup.demo.service.TaskService;
import com.tecsup.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controlador para estadísticas y reportes del sistema
 */
@RestController
@RequestMapping("/api/statistics")
@Tag(name = "Estadísticas", description = "Endpoints para estadísticas y reportes")
@CrossOrigin(origins = "*")
public class StatisticsController {

    private final UserService userService;
    private final TaskService taskService;
    private final SubmissionService submissionService;

    public StatisticsController(UserService userService, TaskService taskService, SubmissionService submissionService) {
        this.userService = userService;
        this.taskService = taskService;
        this.submissionService = submissionService;
    }

    /**
     * Obtiene estadísticas generales del sistema
     * 
     * @return Estadísticas generales
     */
    @PreAuthorize("hasAnyRole('PROFESSOR', 'ADMIN')")
    @GetMapping("/general")
    @Operation(summary = "Estadísticas generales", description = "Obtiene estadísticas generales del sistema")
    public ResponseEntity<Map<String, Object>> getGeneralStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        // Estadísticas de usuarios
        List<User> allUsers = userService.listAll();
        stats.put("totalUsers", allUsers.size());
        stats.put("students", userService.findByRole(User.UserRole.STUDENT).size());
        stats.put("professors", userService.findByRole(User.UserRole.PROFESSOR).size());
        stats.put("admins", userService.findByRole(User.UserRole.ADMIN).size());
        
        // Estadísticas de tareas
        List<Task> allTasks = taskService.listAll();
        stats.put("totalTasks", allTasks.size());
        stats.put("activeTasks", taskService.findActiveTasks().size());
        stats.put("archivedTasks", taskService.findByStatus(Task.TaskStatus.ARCHIVED).size());
        
        // Estadísticas de entregas
        stats.put("totalSubmissions", submissionService.listAll().size());
        stats.put("gradedSubmissions", submissionService.findGradedSubmissions().size());
        stats.put("pendingSubmissions", submissionService.findPendingSubmissions().size());
        stats.put("lateSubmissions", submissionService.findLateSubmissions().size());
        
        return ResponseEntity.ok(stats);
    }

    /**
     * Obtiene estadísticas de un usuario específico
     * 
     * @param userId ID del usuario
     * @return Estadísticas del usuario
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user/{userId}")
    @Operation(summary = "Estadísticas de usuario", description = "Obtiene estadísticas de un usuario específico")
    public ResponseEntity<Map<String, Object>> getUserStatistics(@PathVariable Long userId) {
        return userService.findById(userId)
                .map(user -> {
                    Map<String, Object> stats = new HashMap<>();
                    
                    stats.put("userId", user.getId());
                    stats.put("username", user.getUsername());
                    stats.put("fullName", user.getFirstName() + " " + user.getLastName());
                    stats.put("role", user.getRole().getDisplayName());
                    
                    // Estadísticas de entregas del usuario
                    List<com.tecsup.demo.entity.Submission> userSubmissions = submissionService.findByUser(user);
                    stats.put("totalSubmissions", userSubmissions.size());
                    
                    // Calcular promedio de calificaciones
                    Double averageGrade = submissionService.calculateAverageGradeForUser(user);
                    stats.put("averageGrade", averageGrade != null ? averageGrade : 0.0);
                    
                    // Contar entregas por estado
                    stats.put("gradedSubmissions", submissionService.findByStatus(com.tecsup.demo.entity.Submission.SubmissionStatus.GRADED).size());
                    stats.put("pendingSubmissions", submissionService.findByStatus(com.tecsup.demo.entity.Submission.SubmissionStatus.PENDING).size());
                    stats.put("lateSubmissions", submissionService.findByStatus(com.tecsup.demo.entity.Submission.SubmissionStatus.LATE).size());
                    
                    return ResponseEntity.ok(stats);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Obtiene estadísticas de una tarea específica
     * 
     * @param taskId ID de la tarea
     * @return Estadísticas de la tarea
     */
    @PreAuthorize("hasAnyRole('PROFESSOR', 'ADMIN')")
    @GetMapping("/task/{taskId}")
    @Operation(summary = "Estadísticas de tarea", description = "Obtiene estadísticas de una tarea específica")
    public ResponseEntity<Map<String, Object>> getTaskStatistics(@PathVariable Long taskId) {
        return taskService.findById(taskId)
                .map(task -> {
                    Map<String, Object> stats = new HashMap<>();
                    
                    stats.put("taskId", task.getId());
                    stats.put("taskTitle", task.getTitle());
                    stats.put("taskStatus", task.getStatus().getDisplayName());
                    stats.put("maxGrade", task.getMaxGrade());
                    stats.put("dueDate", task.getDueDate());
                    
                    // Estadísticas de entregas de la tarea
                    List<com.tecsup.demo.entity.Submission> taskSubmissions = submissionService.findByTask(task);
                    stats.put("totalSubmissions", taskSubmissions.size());
                    
                    // Calcular promedio de calificaciones
                    Double averageGrade = submissionService.calculateAverageGradeForTask(task);
                    stats.put("averageGrade", averageGrade != null ? averageGrade : 0.0);
                    
                    // Contar entregas por estado
                    stats.put("gradedSubmissions", submissionService.findByStatus(com.tecsup.demo.entity.Submission.SubmissionStatus.GRADED).size());
                    stats.put("pendingSubmissions", submissionService.findByStatus(com.tecsup.demo.entity.Submission.SubmissionStatus.PENDING).size());
                    stats.put("lateSubmissions", submissionService.findByStatus(com.tecsup.demo.entity.Submission.SubmissionStatus.LATE).size());
                    
                    return ResponseEntity.ok(stats);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Obtiene el ranking de estudiantes por promedio de calificaciones
     * 
     * @return Ranking de estudiantes
     */
    @PreAuthorize("hasAnyRole('PROFESSOR', 'ADMIN')")
    @GetMapping("/ranking/students")
    @Operation(summary = "Ranking de estudiantes", description = "Obtiene el ranking de estudiantes por promedio de calificaciones")
    public ResponseEntity<List<Map<String, Object>>> getStudentRanking() {
        List<User> students = userService.findByRole(User.UserRole.STUDENT);
        
        List<Map<String, Object>> ranking = students.stream()
                .map(student -> {
                    Map<String, Object> studentStats = new HashMap<>();
                    studentStats.put("userId", student.getId());
                    studentStats.put("username", student.getUsername());
                    studentStats.put("fullName", student.getFirstName() + " " + student.getLastName());
                    
                    Double averageGrade = submissionService.calculateAverageGradeForUser(student);
                    studentStats.put("averageGrade", averageGrade != null ? averageGrade : 0.0);
                    
                    return studentStats;
                })
                .sorted((a, b) -> Double.compare((Double) b.get("averageGrade"), (Double) a.get("averageGrade")))
                .toList();
        
        return ResponseEntity.ok(ranking);
    }
} 