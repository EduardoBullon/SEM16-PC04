package com.tecsup.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO para transferencia de datos de estadísticas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDTO {
    
    private Long id;
    private String name;
    private String type;
    private Double value;
    private String unit;
    private LocalDateTime timestamp;
    private String description;
    
    public StatisticsDTO(String name, String type, Double value) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.timestamp = LocalDateTime.now();
    }
    
    public StatisticsDTO(String name, String type, Double value, String unit) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.timestamp = LocalDateTime.now();
    }
} 