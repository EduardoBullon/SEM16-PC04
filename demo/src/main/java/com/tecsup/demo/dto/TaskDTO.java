package com.tecsup.demo.dto;

import com.tecsup.demo.entity.Task;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para transferencia de datos de tareas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    @NotBlank(message = "El título es obligatorio")
    @Size(min = 5, max = 200, message = "El título debe tener entre 5 y 200 caracteres")
    private String title;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(min = 10, message = "La descripción debe tener al menos 10 caracteres")
    private String description;

    @NotNull(message = "La fecha de publicación es obligatoria")
    @FutureOrPresent(message = "La fecha de publicación debe ser presente o futura")
    private LocalDateTime publicationDate;

    @NotNull(message = "La fecha de vencimiento es obligatoria")
    @Future(message = "La fecha de vencimiento debe ser futura")
    private LocalDateTime dueDate;

    private Task.TaskStatus status = Task.TaskStatus.ACTIVE;

    @DecimalMin(value = "0.0", message = "La nota máxima debe ser mayor o igual a 0")
    @DecimalMax(value = "20.0", message = "La nota máxima no puede superar 20")
    private Double maxGrade = 20.0;
}
