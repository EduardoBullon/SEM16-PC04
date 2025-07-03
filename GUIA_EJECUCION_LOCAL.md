# 🏠 Guía de Ejecución Local - Academia Digital

Esta guía te ayudará a ejecutar la aplicación Academia Digital en tu máquina local.

## 📋 Prerrequisitos

### Software Necesario

1. **Java 17** o superior
   ```bash
   java -version
   ```

2. **Maven 3.6** o superior
   ```bash
   mvn -version
   ```

3. **Node.js 18** o superior
   ```bash
   node --version
   npm --version
   ```

4. **MySQL 8.0** o superior
   ```bash
   mysql --version
   ```

### Base de Datos

1. **Instalar MySQL** (si no lo tienes)
   - [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
   - O usar XAMPP/WAMP

2. **Crear base de datos**
   ```sql
   CREATE DATABASE sistema_educativo;
   CREATE USER 'tecsup'@'localhost' IDENTIFIED BY 'tecsup123';
   GRANT ALL PRIVILEGES ON sistema_educativo.* TO 'tecsup'@'localhost';
   FLUSH PRIVILEGES;
   ```

## 🚀 Ejecución Rápida (Windows)

### Opción 1: Script Automático
```bash
# Ejecutar todo con un solo comando
start-all.bat
```

### Opción 2: Scripts Individuales
```bash
# Terminal 1 - Backend
start-backend.bat

# Terminal 2 - Frontend
start-frontend.bat
```

## 🚀 Ejecución Rápida (Linux/Mac)

### Opción 1: Script Automático
```bash
# Dar permisos de ejecución
chmod +x *.sh

# Ejecutar todo con un solo comando
./start-all.sh
```

### Opción 2: Scripts Individuales
```bash
# Terminal 1 - Backend
./start-backend.sh

# Terminal 2 - Frontend
./start-frontend.sh
```

## 🔧 Ejecución Manual

### 1. Iniciar Backend

```bash
# Navegar al directorio del backend
cd demo

# Compilar el proyecto
mvn clean compile

# Ejecutar con perfil de desarrollo
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Backend estará disponible en:** http://localhost:8080

### 2. Iniciar Frontend

```bash
# Navegar al directorio del frontend
cd reactFrontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

**Frontend estará disponible en:** http://localhost:3000

## 📱 Acceso a la Aplicación

### URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Actuator**: http://localhost:8080/actuator

### Usuarios de Prueba

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin` | Administrador |
| `teacher` | `teacher` | Profesor |
| `student` | `student` | Estudiante |

## 🔍 Verificación

### 1. Verificar Backend
```bash
# Probar endpoint de salud
curl http://localhost:8080/actuator/health

# Probar API
curl http://localhost:8080/api/tasks
```

### 2. Verificar Frontend
- Abrir http://localhost:3000
- Intentar hacer login con cualquier usuario
- Verificar que las tareas se cargan

## 🛠️ Configuración de Desarrollo

### Variables de Entorno Frontend

Crear archivo `reactFrontend/.env.local`:
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Academia Digital
VITE_APP_VERSION=1.0.0
```

### Configuración Backend

El archivo `demo/src/main/resources/application-dev.properties` ya está configurado para desarrollo local.

## 🔧 Solución de Problemas

### Error de Conexión a Base de Datos

1. **Verificar MySQL**
   ```bash
   mysql -u tecsup -p
   # Contraseña: tecsup123
   ```

2. **Verificar base de datos**
   ```sql
   SHOW DATABASES;
   USE sistema_educativo;
   SHOW TABLES;
   ```

### Error de Puerto Ocupado

1. **Backend (puerto 8080)**
   ```bash
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F

   # Linux/Mac
   lsof -i :8080
   kill -9 <PID>
   ```

2. **Frontend (puerto 3000)**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Linux/Mac
   lsof -i :3000
   kill -9 <PID>
   ```

### Error de Dependencias

1. **Backend**
   ```bash
   cd demo
   mvn clean install
   ```

2. **Frontend**
   ```bash
   cd reactFrontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### Error de CORS

Verificar que en `application-dev.properties` esté:
```properties
spring.web.cors.allowed-origins=http://localhost:3000
```

## 📊 Monitoreo

### Logs del Backend
- Los logs aparecen en la consola donde ejecutaste el backend
- Nivel DEBUG activado para desarrollo

### Logs del Frontend
- Los logs aparecen en la consola del navegador (F12)
- También en la terminal donde ejecutaste `npm run dev`

### Herramientas de Desarrollo

1. **Swagger UI**: http://localhost:8080/swagger-ui.html
2. **Actuator**: http://localhost:8080/actuator
3. **DevTools del Navegador**: F12

## 🔄 Reinicio de Servicios

### Reiniciar Backend
```bash
# Detener con Ctrl+C
# Luego ejecutar nuevamente
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Reiniciar Frontend
```bash
# Detener con Ctrl+C
# Luego ejecutar nuevamente
npm run dev
```

### Hot Reload
- **Backend**: Cambios en Java requieren reinicio
- **Frontend**: Cambios en React se recargan automáticamente

## 📁 Estructura de Archivos

```
proyecto/
├── demo/                          # Backend Spring Boot
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-dev.properties
│   └── start-backend.bat/.sh
├── reactFrontend/                 # Frontend React
│   ├── src/
│   ├── package.json
│   └── start-frontend.bat/.sh
├── start-all.bat/.sh             # Script de inicio completo
└── GUIA_EJECUCION_LOCAL.md       # Esta guía
```

## 🎯 Próximos Pasos

1. **Explorar la aplicación** con diferentes usuarios
2. **Crear tareas** como profesor
3. **Entregar trabajos** como estudiante
4. **Calificar entregas** como profesor
5. **Ver estadísticas** como administrador

## 🆘 Soporte

Si encuentras problemas:

1. **Verificar logs** en las consolas
2. **Revisar esta guía** de solución de problemas
3. **Verificar prerrequisitos** (Java, Maven, Node.js, MySQL)
4. **Reiniciar servicios** si es necesario

---

**🎓 Academia Digital** - Ejecutándose localmente 