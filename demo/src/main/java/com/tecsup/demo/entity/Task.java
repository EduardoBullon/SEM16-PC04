package com.tecsup.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entidad que representa una tarea o asignación educativa.
 * Contiene información sobre la tarea y sus fechas importantes.
 */
@Entity
@Table(name = "tasks", indexes = {
    @Index(name = "idx_publication_date", columnList = "publication_date"),
    @Index(name = "idx_due_date", columnList = "due_date")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Size(min = 5, max = 200, message = "El título debe tener entre 5 y 200 caracteres")
    @Column(nullable = false, length = 200)
    private String title;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(min = 10, message = "La descripción debe tener al menos 10 caracteres")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "La fecha de publicación es obligatoria")
    @FutureOrPresent(message = "La fecha de publicación debe ser presente o futura")
    @Column(name = "publication_date", nullable = false)
    private LocalDateTime publicationDate;

    @NotNull(message = "La fecha de vencimiento es obligatoria")
    @Future(message = "La fecha de vencimiento debe ser futura")
    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TaskStatus status = TaskStatus.ACTIVE;

    @Column(name = "max_grade")
    @DecimalMin(value = "0.0", message = "La nota máxima debe ser mayor o igual a 0")
    @DecimalMax(value = "20.0", message = "La nota máxima no puede superar 20")
    private Double maxGrade = 20.0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Submission> submissions;

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
     * Estados posibles de una tarea
     */
    public enum TaskStatus {
        ACTIVE("Activa"),
        INACTIVE("Inactiva"),
        ARCHIVED("Archivada");

        private final String displayName;

        TaskStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}
