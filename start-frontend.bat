@echo off
echo ========================================
echo   Iniciando Frontend - Academia Digital
echo ========================================
echo.

cd reactFrontend

echo Instalando dependencias...
call npm install

echo.
echo Iniciando servidor de desarrollo en http://localhost:3000
echo.

call npm run dev

pause 