# 🚀 Guía de Ejecución - Sistema Educativo Completo

Esta guía te ayudará a ejecutar todo el sistema educativo con backend Spring Boot y frontend React.

## 📋 Prerrequisitos

### Software Requerido
- **Java 17** o superior
- **Node.js 16** o superior
- **MySQL 8.0** o superior
- **Docker** y **Docker Compose** (opcional, para ejecución con contenedores)
- **Maven** (incluido con Spring Boot)

### Verificar Instalaciones
```bash
# Verificar Java
java -version

# Verificar Node.js
node --version
npm --version

# Verificar MySQL
mysql --version

# Verificar Docker (opcional)
docker --version
docker-compose --version
```

## 🎯 Opción 1: Ejecución Manual (Recomendada para Desarrollo)

### Paso 1: Configurar Base de Datos MySQL

1. **Iniciar MySQL**:
```bash
# En Windows (si tienes XAMPP/WAMP)
# Inicia el servicio MySQL desde el panel de control

# En Linux/Mac
sudo systemctl start mysql
```

2. **Crear Base de Datos**:
```bash
mysql -u root -p
```

```sql
CREATE DATABASE sistema_educativo;
CREATE USER 'tecsup'@'localhost' IDENTIFIED BY 'tecsup123';
GRANT ALL PRIVILEGES ON sistema_educativo.* TO 'tecsup'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Paso 2: Ejecutar Backend Spring Boot

1. **Navegar al directorio del backend**:
```bash
cd demo
```

2. **Verificar configuración**:
- Asegúrate de que el archivo `src/main/resources/application.properties` tenga la configuración correcta de MySQL

3. **Ejecutar la aplicación**:
```bash
# Con Maven Wrapper (recomendado)
./mvnw spring-boot:run

# O con Maven instalado
mvn spring-boot:run
```

4. **Verificar que el backend esté funcionando**:
- Abre http://localhost:8080 en tu navegador
- Deberías ver la página de bienvenida de Spring Boot
- Swagger UI: http://localhost:8080/swagger-ui.html

### Paso 3: Ejecutar Frontend React

1. **Abrir una nueva terminal y navegar al frontend**:
```bash
cd reactFrontend
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Verificar archivo .env**:
```bash
# Asegúrate de que el archivo .env contenga:
VITE_API_URL=http://localhost:8080/api
```

4. **Ejecutar el frontend**:
```bash
npm run dev
```

5. **Verificar que el frontend esté funcionando**:
- Abre http://localhost:3000 en tu navegador
- Deberías ver la página de login del sistema

## 🐳 Opción 2: Ejecución con Docker (Recomendada para Producción)

### Ejecutar Todo el Sistema con Docker Compose

1. **Navegar al directorio raíz del proyecto**:
```bash
# Desde la raíz del proyecto
```

2. **Ejecutar con Docker Compose**:
```bash
docker-compose up -d
```

3. **Verificar que todos los servicios estén funcionando**:
```bash
docker-compose ps
```

4. **Ver logs si hay problemas**:
```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

5. **Acceder a la aplicación**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

### Detener el Sistema
```bash
docker-compose down
```

## 🔐 Usuarios de Prueba

Una vez que el sistema esté funcionando, puedes usar estos usuarios para probar:

| Usuario | Contraseña | Rol | Funcionalidades |
|---------|------------|-----|-----------------|
| admin | admin | Administrador | Acceso completo |
| teacher | teacher | Profesor | Crear/editar tareas, calificar |
| student | student | Estudiante | Ver tareas, crear submissions |

## 🧪 Probar el Sistema

### 1. Login
1. Ve a http://localhost:3000
2. Usa cualquiera de los usuarios de prueba
3. Deberías ser redirigido a la lista de tareas

### 2. Crear una Tarea (como Teacher)
1. Inicia sesión como `teacher/teacher`
2. Haz clic en "Nueva Tarea"
3. Completa el formulario
4. Guarda la tarea

### 3. Crear una Submission (como Student)
1. Inicia sesión como `student/student`
2. Ve a una tarea existente
3. Haz clic en "Crear Submission"
4. Completa el formulario

### 4. Calificar Submission (como Teacher)
1. Inicia sesión como `teacher/teacher`
2. Ve a la lista de submissions
3. Selecciona una submission
4. Asigna una calificación

## 🔧 Configuración Avanzada

### Variables de Entorno del Backend
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_educativo
spring.datasource.username=tecsup
spring.datasource.password=tecsup123
jwt.secret=miClaveSecretaJWT2024SistemaEducativo
```

### Variables de Entorno del Frontend
```env
# .env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Sistema Educativo
VITE_APP_VERSION=2.0.0
```

## 🐛 Solución de Problemas

### Problema: Backend no se conecta a MySQL
**Síntomas**: Error de conexión en los logs del backend
**Solución**:
1. Verificar que MySQL esté ejecutándose
2. Verificar credenciales en `application.properties`
3. Verificar que la base de datos exista

### Problema: Frontend no se conecta al Backend
**Síntomas**: Error 404 o CORS en la consola del navegador
**Solución**:
1. Verificar que el backend esté ejecutándose en puerto 8080
2. Verificar la URL en el archivo `.env` del frontend
3. Verificar configuración de CORS en el backend

### Problema: Error de JWT
**Síntomas**: Error 401 en las peticiones
**Solución**:
1. Limpiar localStorage del navegador
2. Verificar que el JWT_SECRET esté configurado
3. Hacer logout y login nuevamente

### Problema: Docker no inicia
**Síntomas**: Error al ejecutar `docker-compose up`
**Solución**:
1. Verificar que Docker esté ejecutándose
2. Verificar que los puertos 3000, 8080, 3306 estén libres
3. Ejecutar `docker-compose down` y luego `docker-compose up -d`

## 📊 Monitoreo

### Verificar Estado de los Servicios
```bash
# Backend health check
curl http://localhost:8080/actuator/health

# Frontend (debería responder con HTML)
curl http://localhost:3000

# MySQL
mysql -u tecsup -p -h localhost -e "SELECT 1;"
```

### Logs en Tiempo Real
```bash
# Backend logs
tail -f demo/logs/application.log

# Docker logs
docker-compose logs -f
```

## 🚀 Despliegue en Producción

### Consideraciones de Seguridad
1. Cambiar contraseñas por defecto
2. Configurar HTTPS
3. Usar variables de entorno para secretos
4. Configurar firewall
5. Hacer backup regular de la base de datos

### Escalabilidad
1. Usar balanceador de carga
2. Configurar múltiples instancias
3. Usar base de datos en la nube
4. Configurar CDN para archivos estáticos

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs de la aplicación
2. Verifica la configuración de red
3. Asegúrate de que todos los servicios estén ejecutándose
4. Consulta la documentación de Spring Boot y React

¡El sistema está listo para usar! 🎉 