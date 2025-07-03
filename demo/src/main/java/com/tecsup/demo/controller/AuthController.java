package com.tecsup.demo.controller;

import com.tecsup.demo.dto.LoginRequest;
import com.tecsup.demo.dto.LoginResponse;
import com.tecsup.demo.security.JwtUtil;
import com.tecsup.demo.service.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador para operaciones de autenticación
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Endpoints para autenticación de usuarios")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Autentica un usuario y genera un token JWT
     * 
     * @param request Datos de login (username y password)
     * @return Token JWT si la autenticación es exitosa
     */
    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Autentica un usuario y retorna un token JWT")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
            String token = jwtUtil.generateToken(user);
            
            return ResponseEntity.ok(new LoginResponse(token, "Autenticación exitosa"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Credenciales inválidas");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error en la autenticación");
        }
    }

    /**
     * Verifica si un token JWT es válido
     * 
     * @param token Token JWT a verificar
     * @return true si el token es válido
     */
    @PostMapping("/verify")
    @Operation(summary = "Verificar token", description = "Verifica si un token JWT es válido")
    public ResponseEntity<?> verifyToken(@RequestParam String token) {
        try {
            // Extraer el username del token
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            boolean isValid = jwtUtil.validateToken(token, userDetails);
            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
}

