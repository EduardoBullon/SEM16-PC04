package com.tecsup.demo.dto;

import com.tecsup.demo.entity.Submission;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para transferencia de datos de entregas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionDTO {

    @NotNull(message = "La fecha de entrega es obligatoria")
    @PastOrPresent(message = "La fecha de entrega debe ser pasada o presente")
    private LocalDateTime submissionDate;

    @NotNull(message = "El estado es obligatorio")
    private Submission.SubmissionStatus status = Submission.SubmissionStatus.SUBMITTED;

    @DecimalMin(value = "0.0", message = "La nota debe ser mayor o igual a 0")
    @DecimalMax(value = "20.0", message = "La nota no puede superar 20")
    private Double grade;

    @Size(max = 1000, message = "Los comentarios no deben superar los 1000 caracteres")
    private String comments;

    @Size(max = 500, message = "La URL del archivo no debe superar los 500 caracteres")
    private String fileUrl;

    @Size(max = 255, message = "El nombre del archivo no debe superar los 255 caracteres")
    private String fileName;

    @Min(value = 0, message = "El tamaño del archivo debe ser mayor o igual a 0")
    private Long fileSize;

    @NotNull(message = "El ID del usuario es obligatorio")
    @Min(value = 1, message = "El ID del usuario debe ser válido")
    private Long userId;

    @NotNull(message = "El ID de la tarea es obligatorio")
    @Min(value = 1, message = "El ID de la tarea debe ser válido")
    private Long taskId;
}
