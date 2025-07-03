package com.tecsup.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO para respuesta de autenticación
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String message;
    private String type = "Bearer";
    private Long expiresIn = 86400000L; // 24 horas en milisegundos

    public LoginResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    public LoginResponse(String token) {
        this.token = token;
        this.message = "Autenticación exitosa";
    }
}
