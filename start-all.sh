#!/bin/bash

echo "========================================"
echo "   Academia Digital - Inicio Completo"
echo "========================================"
echo

echo "Iniciando Backend y Frontend..."
echo

echo "[1/2] Iniciando Backend..."
gnome-terminal --title="Backend - Academia Digital" -- bash -c "./start-backend.sh; exec bash" &
# Para macOS: open -a Terminal ./start-backend.sh

echo "Esperando 10 segundos para que el backend inicie..."
sleep 10

echo "[2/2] Iniciando Frontend..."
gnome-terminal --title="Frontend - Academia Digital" -- bash -c "./start-frontend.sh; exec bash" &
# Para macOS: open -a Terminal ./start-frontend.sh

echo
echo "========================================"
echo "   Aplicación iniciada correctamente"
echo "========================================"
echo
echo "Backend:  http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo
echo "Usuarios de prueba:"
echo "- Admin: admin / admin"
echo "- Profesor: teacher / teacher"
echo "- Estudiante: student / student"
echo 