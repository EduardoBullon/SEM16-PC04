package com.tecsup.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidad que representa la entrega de una tarea por parte de un estudiante.
 * Contiene información sobre la entrega, calificación y comentarios.
 */
@Entity
@Table(name = "submissions", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"task_id", "user_id"}, name = "uk_task_user")
}, indexes = {
    @Index(name = "idx_submission_date", columnList = "submission_date"),
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_task_id", columnList = "task_id"),
    @Index(name = "idx_user_id", columnList = "user_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La fecha de entrega es obligatoria")
    @PastOrPresent(message = "La fecha de entrega debe ser pasada o presente")
    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SubmissionStatus status = SubmissionStatus.SUBMITTED;

    @DecimalMin(value = "0.0", message = "La nota debe ser mayor o igual a 0")
    @DecimalMax(value = "20.0", message = "La nota no puede superar 20")
    @Column
    private Double grade;

    @Size(max = 1000, message = "Los comentarios no deben superar los 1000 caracteres")
    @Column(columnDefinition = "TEXT")
    private String comments;

    @Size(max = 500, message = "La URL del archivo no debe superar los 500 caracteres")
    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "file_size")
    private Long fileSize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /**
     * Estados posibles de una entrega
     */
    public enum SubmissionStatus {
        SUBMITTED("Entregado"),
        GRADED("Calificada"),
        LATE("Fuera de plazo"),
        PENDING("Pendiente");

        private final String displayName;

        SubmissionStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}
