@echo off
echo ========================================
echo    Academia Digital - Inicio Completo
echo ========================================
echo.

echo Iniciando Backend y Frontend...
echo.

echo [1/2] Iniciando Backend...
start "Backend - Academia Digital" cmd /k "start-backend.bat"

echo Esperando 10 segundos para que el backend inicie...
timeout /t 10 /nobreak > nul

echo [2/2] Iniciando Frontend...
start "Frontend - Academia Digital" cmd /k "start-frontend.bat"

echo.
echo ========================================
echo    Aplicación iniciada correctamente
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Usuarios de prueba:
echo - Admin: admin / admin
echo - Profesor: teacher / teacher
echo - Estudiante: student / student
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul 