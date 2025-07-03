@echo off
echo ========================================
echo    Iniciando Backend - Academia Digital
echo ========================================
echo.

cd demo

echo Compilando proyecto...
call mvn clean compile

echo.
echo Iniciando servidor en http://localhost:8080
echo.
echo Usuarios de prueba:
echo - Admin: admin / admin
echo - Profesor: teacher / teacher  
echo - Estudiante: student / student
echo.

call mvn spring-boot:run -Dspring-boot.run.profiles=dev

pause 