# 🚀 Guía de Despliegue en Railway

Esta guía te ayudará a desplegar tu aplicación Academia Digital en Railway paso a paso.

## 📋 Prerrequisitos

1. **Cuenta en Railway**: [railway.app](https://railway.app)
2. **Cuenta en GitHub**: Tu código debe estar en un repositorio
3. **Railway CLI** (opcional): `npm install -g @railway/cli`

## 🔧 Paso 1: Preparar el Repositorio

### 1.1 Subir código a GitHub

```bash
# Inicializar git si no está inicializado
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Preparar para despliegue en Railway"

# Agregar repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Subir a GitHub
git push -u origin main
```

### 1.2 Verificar estructura del proyecto

Tu repositorio debe tener esta estructura:
```
tu-repositorio/
├── demo/                    # Backend Spring Boot
│   ├── Dockerfile
│   ├── system.properties
│   ├── railway.json
│   └── src/
├── reactFrontend/           # Frontend React
│   ├── Dockerfile
│   ├── railway.json
│   ├── nginx.conf
│   ├── start.sh
│   └── src/
└── README.md
```

## 🚀 Paso 2: Desplegar Backend en Railway

### 2.1 Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu cuenta de GitHub
5. Selecciona tu repositorio
6. En "Root Directory" especifica: `demo`
7. Haz clic en "Deploy"

### 2.2 Configurar Base de Datos

1. En tu proyecto de Railway, haz clic en "New"
2. Selecciona "Database" → "MySQL"
3. Espera a que se cree la base de datos
4. Copia las variables de entorno que te proporciona Railway

### 2.3 Configurar Variables de Entorno

En tu proyecto backend, ve a "Variables" y agrega:

```env
# Base de datos (Railway te proporciona estas variables)
DATABASE_URL=mysql://tu-url-de-railway
DATABASE_USERNAME=root
DATABASE_PASSWORD=tu-password

# JWT (genera una clave segura)
JWT_SECRET=tu-clave-secreta-muy-segura-12345678901234567890
JWT_EXPIRATION=86400

# CORS (actualiza con la URL de tu frontend)
CORS_ORIGINS=https://tu-frontend.railway.app

# Puerto (Railway lo asigna automáticamente)
PORT=8080
```

### 2.4 Verificar Despliegue

1. Ve a la pestaña "Deployments"
2. Espera a que el build termine
3. Haz clic en el dominio generado
4. Deberías ver la página de Spring Boot

## 🌐 Paso 3: Desplegar Frontend en Railway

### 3.1 Crear proyecto para Frontend

1. En Railway, haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Selecciona el mismo repositorio
4. En "Root Directory" especifica: `reactFrontend`
5. Haz clic en "Deploy"

### 3.2 Configurar Variables de Entorno

En tu proyecto frontend, ve a "Variables" y agrega:

```env
# URL de la API del backend (usa la URL de tu backend en Railway)
VITE_API_URL=https://tu-backend.railway.app/api
```

### 3.3 Verificar Despliegue

1. Espera a que el build termine
2. Haz clic en el dominio generado
3. Deberías ver tu aplicación React

## 🔗 Paso 4: Conectar Frontend con Backend

### 4.1 Actualizar CORS en Backend

En las variables de entorno del backend, actualiza:

```env
CORS_ORIGINS=https://tu-frontend.railway.app
```

### 4.2 Verificar Conexión

1. Abre tu frontend
2. Intenta hacer login
3. Verifica que las peticiones lleguen al backend

## 🛠️ Paso 5: Configuración Avanzada

### 5.1 Dominios Personalizados (Opcional)

1. En Railway, ve a "Settings"
2. En "Domains", agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

### 5.2 Monitoreo

1. Railway proporciona logs automáticos
2. Ve a "Deployments" para ver el historial
3. Usa "Metrics" para monitorear rendimiento

## 🔧 Solución de Problemas

### Error de Conexión a Base de Datos

```bash
# Verifica las variables de entorno
DATABASE_URL=mysql://...
DATABASE_USERNAME=root
DATABASE_PASSWORD=...
```

### Error de CORS

```bash
# En el backend, verifica:
CORS_ORIGINS=https://tu-frontend.railway.app
```

### Error de Build

1. Verifica los logs en Railway
2. Asegúrate de que el Dockerfile esté correcto
3. Verifica que todas las dependencias estén en package.json

### Error de Puerto

```bash
# Railway asigna automáticamente el puerto
# No necesitas configurar nada
```

## 📊 Monitoreo y Mantenimiento

### Logs

- Railway proporciona logs en tiempo real
- Ve a "Deployments" → "View Logs"

### Métricas

- Railway muestra métricas de CPU, memoria y red
- Útil para optimizar rendimiento

### Escalado

- Railway escala automáticamente
- Puedes configurar escalado manual si es necesario

## 🔐 Seguridad

### Variables de Entorno

- Nunca subas claves secretas al repositorio
- Usa variables de entorno de Railway
- Rota las claves JWT regularmente

### HTTPS

- Railway proporciona HTTPS automáticamente
- No necesitas configuración adicional

## 📱 URLs Finales

Después del despliegue, tendrás:

- **Backend**: `https://tu-backend.railway.app`
- **Frontend**: `https://tu-frontend.railway.app`
- **API**: `https://tu-backend.railway.app/api`

## 🎯 Próximos Pasos

1. **Configurar dominio personalizado**
2. **Configurar monitoreo avanzado**
3. **Implementar CI/CD**
4. **Configurar backups de base de datos**

## 🆘 Soporte

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: Para problemas específicos del código

---

**🎓 Academia Digital** - Desplegada exitosamente en Railway 