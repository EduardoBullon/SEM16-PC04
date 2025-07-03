# 🎓 Academia Digital

Una aplicación web moderna para la gestión de tareas académicas con diseño completamente renovado y funcionalidad mejorada.

## ✨ Características

### 🎨 Diseño Moderno
- **Tema de gradientes**: Fondo con gradientes modernos en tonos azul-púrpura
- **Glassmorphism**: Efectos de cristal con transparencias y blur
- **Animaciones suaves**: Transiciones y animaciones CSS para mejor UX
- **Iconos emoji**: Interfaz más amigable y visual
- **Responsive**: Diseño adaptativo para todos los dispositivos

### 🚀 Funcionalidades
- **Autenticación JWT**: Sistema de login seguro con tokens
- **Gestión de Tareas**: CRUD completo para tareas educativas
- **Roles de Usuario**: ADMIN, TEACHER, STUDENT con permisos diferenciados
- **Sistema de Entregas**: Subir archivos y comentarios
- **Calificaciones**: Sistema de notas (0-20)
- **Dashboard con Estadísticas**: Vista rápida del estado de las tareas

## 🛠️ Tecnologías

### Backend
- **Spring Boot 3**: Framework principal
- **Spring Security**: Autenticación y autorización
- **Spring Data JPA**: Persistencia de datos
- **MySQL**: Base de datos
- **JWT**: Tokens de autenticación
- **Maven**: Gestión de dependencias

### Frontend
- **React 19**: Framework principal
- **React Router**: Navegación entre páginas
- **Zustand**: Gestión de estado
- **Axios**: Cliente HTTP
- **CSS Moderno**: Variables CSS, Grid, Flexbox, Animaciones
- **Vite**: Build tool y desarrollo

## 🚀 Ejecución Local

### Prerrequisitos
- Java 17+
- Maven 3.6+
- Node.js 18+
- MySQL 8.0+

### Ejecución Rápida

#### Windows
```bash
# Ejecutar todo con un solo comando
start-all.bat
```

#### Linux/Mac
```bash
# Dar permisos de ejecución
chmod +x *.sh

# Ejecutar todo con un solo comando
./start-all.sh
```

### Ejecución Manual

#### 1. Backend
```bash
cd demo
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

#### 2. Frontend
```bash
cd reactFrontend
npm install
npm run dev
```

### URLs de Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/swagger-ui.html

### Usuarios de Prueba
| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin` | Administrador |
| `teacher` | `teacher` | Profesor |
| `student` | `student` | Estudiante |

## 🚀 Despliegue en Railway

Para desplegar en Railway, sigue la guía completa:

📖 **[Guía de Despliegue en Railway](GUIA_DESPLIEGUE_RAILWAY.md)**

## 📖 Documentación

- **[Guía de Ejecución Local](GUIA_EJECUCION_LOCAL.md)** - Ejecutar localmente
- **[Guía de Despliegue Railway](GUIA_DESPLIEGUE_RAILWAY.md)** - Desplegar en Railway

## 📁 Estructura del Proyecto

```
proyecto/
├── demo/                          # Backend Spring Boot
│   ├── src/main/java/
│   │   └── com/tecsup/demo/
│   │       ├── controller/        # Controladores REST
│   │       ├── service/           # Lógica de negocio
│   │       ├── repository/        # Acceso a datos
│   │       ├── entity/            # Entidades JPA
│   │       ├── security/          # Configuración de seguridad
│   │       └── config/            # Configuraciones
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-dev.properties
│   ├── Dockerfile
│   └── system.properties
├── reactFrontend/                 # Frontend React
│   ├── src/
│   │   ├── components/            # Componentes reutilizables
│   │   ├── pages/                 # Páginas principales
│   │   ├── services/              # Servicios API
│   │   ├── store/                 # Estado global
│   │   └── utils/                 # Utilidades
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── start-all.bat/.sh             # Scripts de inicio
└── README.md
```

## 🎯 Funcionalidades por Rol

### 👨‍💼 Administrador
- Gestión completa de usuarios
- Acceso a todas las funcionalidades
- Estadísticas del sistema

### 👨‍🏫 Profesor
- Crear y editar tareas
- Revisar entregas de estudiantes
- Calificar trabajos
- Ver estadísticas

### 👨‍🎓 Estudiante
- Ver tareas asignadas
- Entregar trabajos
- Ver calificaciones
- Seguir el progreso

## 🔧 Configuración

### Variables de Entorno

#### Backend
```properties
# Base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_educativo
spring.datasource.username=tecsup
spring.datasource.password=tecsup123

# JWT
jwt.secret=miClaveSecretaMuySegura12345678901234567890
jwt.expiration=86400

# CORS
spring.web.cors.allowed-origins=http://localhost:3000
```

#### Frontend
```env
VITE_API_URL=http://localhost:8080/api
```

## 🎨 Paleta de Colores

```css
--primary-color: #4f46e5    /* Azul principal */
--secondary-color: #7c3aed  /* Púrpura secundario */
--success-color: #10b981    /* Verde éxito */
--danger-color: #ef4444     /* Rojo error */
--warning-color: #f59e0b    /* Amarillo advertencia */
--info-color: #3b82f6       /* Azul información */
```

## 🔧 Solución de Problemas

### Error de Conexión a Base de Datos
1. Verificar que MySQL esté ejecutándose
2. Verificar credenciales en `application-dev.properties`
3. Crear base de datos si no existe

### Error de Puerto Ocupado
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

### Error de Dependencias
```bash
# Backend
cd demo
mvn clean install

# Frontend
cd reactFrontend
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoreo

### Logs
- **Backend**: Consola donde ejecutaste `mvn spring-boot:run`
- **Frontend**: Consola del navegador (F12) y terminal

### Herramientas de Desarrollo
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Actuator**: http://localhost:8080/actuator
- **DevTools**: F12 en el navegador

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

- **Documentación**: Revisa las guías en este README
- **Issues**: Para problemas específicos del código
- **Logs**: Verifica los logs en las consolas

---

**🎓 Academia Digital** - Transformando la educación con tecnología moderna 