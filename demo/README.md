# 🎓 Sistema Educativo - Backend API

## 📋 Descripción

Sistema de gestión educativa que proporciona una API REST completa para la administración de usuarios, tareas educativas, entregas y calificaciones. Desarrollado con Spring Boot 3.x y las mejores prácticas de desarrollo.

## ✨ Características Principales

### 🔐 Autenticación y Autorización
- **JWT (JSON Web Tokens)** para autenticación segura
- **Roles de usuario**: Estudiante, Profesor, Administrador
- **Spring Security** con configuración personalizada
- **CORS** configurado para integración con frontend

### 👥 Gestión de Usuarios
- Registro y autenticación de usuarios
- Perfiles con información personal
- Roles y permisos diferenciados
- Validación de datos con Bean Validation

### 📚 Gestión de Tareas
- Creación y asignación de tareas educativas
- Estados de tareas (Activa, Inactiva, Archivada)
- Fechas de publicación y vencimiento
- Calificación máxima configurable

### 📝 Sistema de Entregas
- Entrega de tareas por estudiantes
- Estados de entrega (Entregado, Calificado, Pendiente, Tardío)
- Sistema de calificaciones (0-20)
- Comentarios y archivos adjuntos

### 📊 Estadísticas y Reportes
- Estadísticas generales del sistema
- Reportes por usuario y tarea
- Ranking de estudiantes
- Promedios de calificaciones

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Security**
- **Spring Data JPA**
- **MySQL 8.0**
- **JWT (JSON Web Tokens)**
- **Swagger/OpenAPI 3**
- **Lombok**
- **Bean Validation**

### Herramientas de Desarrollo
- **Maven** - Gestión de dependencias
- **Docker** - Containerización
- **Git** - Control de versiones

## 🚀 Instalación y Configuración

### Prerrequisitos
- Java 17 o superior
- MySQL 8.0 o superior
- Maven 3.6+
- Docker (opcional)

### Configuración de Base de Datos

1. **Crear base de datos MySQL:**
```sql
CREATE DATABASE evaluacion04 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Configurar variables de entorno:**
```bash
export MYSQLHOST=localhost
export MYSQLPORT=3306
export MYSQLDATABASE=evaluacion04
export MYSQLUSER=root
export MYSQLPASSWORD=tu_password
export JWT_SECRET=tu_clave_secreta_muy_segura
```

### Ejecución Local

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd demo
```

2. **Compilar el proyecto:**
```bash
mvn clean compile
```

3. **Ejecutar la aplicación:**
```bash
mvn spring-boot:run
```

### Ejecución con Docker

1. **Construir la imagen:**
```bash
docker build -t sistema-educativo .
```

2. **Ejecutar el contenedor:**
```bash
docker run -p 8080:8080 --name sistema-educativo sistema-educativo
```

## 📖 Documentación de la API

### Swagger UI
Una vez ejecutada la aplicación, la documentación interactiva estará disponible en:
```
http://localhost:8080/swagger-ui.html
```

### Endpoints Principales

#### 🔐 Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/verify` - Verificar token

#### 👥 Usuarios
- `GET /api/users` - Listar usuarios (Admin)
- `POST /api/users` - Crear usuario
- `GET /api/users/{id}` - Obtener usuario
- `PUT /api/users/{id}` - Actualizar usuario (Admin)
- `DELETE /api/users/{id}` - Eliminar usuario (Admin)
- `GET /api/users/me` - Usuario actual

#### 📚 Tareas
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks` - Crear tarea (Profesor)
- `GET /api/tasks/{id}` - Obtener tarea
- `PUT /api/tasks/{id}` - Actualizar tarea (Profesor)
- `DELETE /api/tasks/{id}` - Eliminar tarea (Profesor)
- `GET /api/tasks/status/{status}` - Tareas por estado

#### 📝 Entregas
- `GET /api/submissions` - Listar entregas
- `POST /api/submissions` - Crear entrega (Estudiante)
- `GET /api/submissions/{id}` - Obtener entrega
- `PUT /api/submissions/{id}` - Actualizar entrega
- `DELETE /api/submissions/{id}` - Eliminar entrega (Estudiante)
- `GET /api/submissions/task/{taskId}` - Entregas por tarea
- `GET /api/submissions/user/{userId}` - Entregas por usuario

#### 📊 Estadísticas
- `GET /api/statistics/general` - Estadísticas generales
- `GET /api/statistics/user/{userId}` - Estadísticas de usuario
- `GET /api/statistics/task/{taskId}` - Estadísticas de tarea
- `GET /api/statistics/ranking/students` - Ranking de estudiantes

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `MYSQLHOST` | Host de MySQL | `localhost` |
| `MYSQLPORT` | Puerto de MySQL | `3306` |
| `MYSQLDATABASE` | Nombre de la base de datos | `evaluacion04` |
| `MYSQLUSER` | Usuario de MySQL | `root` |
| `MYSQLPASSWORD` | Contraseña de MySQL | `root` |
| `JWT_SECRET` | Clave secreta para JWT | `miClaveSecretaMuySegura12345678901234567890` |
| `JWT_EXPIRATION` | Expiración del token (segundos) | `86400` (24 horas) |
| `SERVER_PORT` | Puerto del servidor | `8080` |
| `SHOW_SQL` | Mostrar SQL en logs | `false` |

### Configuración de Base de Datos

La aplicación utiliza las siguientes configuraciones optimizadas:

- **Pool de conexiones HikariCP** con 20 conexiones máximas
- **Batch processing** para operaciones masivas
- **UTF-8** para soporte completo de caracteres
- **Índices optimizados** para consultas frecuentes

## 🧪 Testing

### Ejecutar Tests
```bash
mvn test
```

### Cobertura de Tests
```bash
mvn jacoco:report
```

## 📦 Estructura del Proyecto

```
src/main/java/com/tecsup/demo/
├── config/                 # Configuraciones
│   ├── DataInitializer.java
│   └── SecurityConfig.java
├── controller/            # Controladores REST
│   ├── AuthController.java
│   ├── TaskController.java
│   ├── UserController.java
│   ├── SubmissionController.java
│   └── StatisticsController.java
├── dto/                   # Objetos de transferencia
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   ├── TaskDTO.java
│   ├── UserDTO.java
│   ├── SubmissionDTO.java
│   └── StatisticsDTO.java
├── entity/                # Entidades JPA
│   ├── User.java
│   ├── Task.java
│   └── Submission.java
├── exception/             # Manejo de excepciones
│   └── GlobalExceptionHandler.java
├── repository/            # Repositorios de datos
│   ├── UserRepository.java
│   ├── TaskRepository.java
│   └── SubmissionRepository.java
├── security/              # Configuración de seguridad
│   ├── JwtAuthenticationEntryPoint.java
│   ├── JwtAuthenticationFilter.java
│   └── JwtUtil.java
├── service/               # Lógica de negocio
│   ├── CustomUserDetailsService.java
│   ├── UserService.java
│   ├── TaskService.java
│   └── SubmissionService.java
└── DemoApplication.java   # Clase principal
```

## 🔒 Seguridad

### Autenticación JWT
- Tokens con expiración configurable
- Refresh tokens (próximamente)
- Blacklist de tokens (próximamente)

### Autorización por Roles
- **STUDENT**: Puede ver tareas, crear entregas, ver sus propias entregas
- **PROFESSOR**: Puede crear/editar tareas, calificar entregas, ver estadísticas
- **ADMIN**: Acceso completo al sistema

### Validación de Datos
- Bean Validation en todos los DTOs
- Sanitización de inputs
- Validación de tipos de archivo

## 📈 Monitoreo y Logs

### Logs Configurados
- **INFO**: Operaciones normales
- **DEBUG**: Información de desarrollo
- **ERROR**: Errores y excepciones

### Métricas (Próximamente)
- Prometheus metrics
- Health checks
- Performance monitoring

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

- **Desarrollador Principal**: Equipo de Desarrollo Tecsup
- **Email**: desarrollo@tecsup.edu.pe
- **Sitio Web**: https://www.tecsup.edu.pe

## 🆘 Soporte

Para soporte técnico o preguntas:
- 📧 Email: desarrollo@tecsup.edu.pe
- 📖 Documentación: http://localhost:8080/swagger-ui.html
- 🐛 Issues: Crear un issue en el repositorio

---

**Versión**: 2.0.0  
**Última actualización**: Diciembre 2024  
**Estado**: ✅ Activo y en desarrollo 