# 🎓 Academia Digital - Frontend React

Una aplicación web moderna para la gestión de tareas académicas con un diseño completamente renovado y funcionalidad mejorada.

## ✨ Características del Nuevo Diseño

### 🎨 Diseño Moderno
- **Tema de gradientes**: Fondo con gradientes modernos en tonos azul-púrpura
- **Glassmorphism**: Efectos de cristal con transparencias y blur
- **Animaciones suaves**: Transiciones y animaciones CSS para mejor UX
- **Iconos emoji**: Interfaz más amigable y visual
- **Responsive**: Diseño adaptativo para todos los dispositivos

### 🚀 Funcionalidades Mejoradas
- **Dashboard con estadísticas**: Vista rápida del estado de las tareas
- **Indicadores de estado**: Colores y badges para mostrar el estado de las tareas
- **Formularios modernos**: Campos con mejor UX y validación visual
- **Loading states**: Indicadores de carga con spinners personalizados
- **Notificaciones mejoradas**: Alertas con mejor diseño y funcionalidad

### 🎯 Componentes Rediseñados
- **Header moderno**: Navegación con avatar de usuario y menú desplegable
- **Cards interactivas**: Hover effects y animaciones
- **Botones con gradientes**: Diseño moderno con efectos hover
- **Formularios mejorados**: Mejor UX con placeholders y validación

## 🛠️ Tecnologías Utilizadas

- **React 19**: Framework principal
- **React Router**: Navegación entre páginas
- **Zustand**: Gestión de estado
- **Axios**: Cliente HTTP
- **CSS Moderno**: Variables CSS, Grid, Flexbox, Animaciones
- **Vite**: Build tool y desarrollo

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Características del Sistema

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

## 🎨 Paleta de Colores

```css
--primary-color: #4f46e5    /* Azul principal */
--secondary-color: #7c3aed  /* Púrpura secundario */
--success-color: #10b981    /* Verde éxito */
--danger-color: #ef4444     /* Rojo error */
--warning-color: #f59e0b    /* Amarillo advertencia */
--info-color: #3b82f6       /* Azul información */
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Header moderno con navegación
│   ├── GradeForm.jsx   # Formulario de calificación
│   └── ProtectedRoute.jsx
├── pages/              # Páginas principales
│   ├── Login.jsx       # Página de login rediseñada
│   └── tasks/          # Páginas de tareas
├── services/           # Servicios API
├── store/              # Estado global (Zustand)
├── utils/              # Utilidades
├── App.jsx             # Componente principal
├── index.css           # Estilos globales modernos
└── main.jsx            # Punto de entrada
```

## 🔧 Configuración

### Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api
```

### Usuarios de Prueba
- **Admin**: `admin` / `admin`
- **Profesor**: `teacher` / `teacher`
- **Estudiante**: `student` / `student`

## 🎯 Funcionalidades Principales

### 📚 Gestión de Tareas
- Crear tareas con título, descripción y fechas
- Editar tareas existentes
- Eliminar tareas
- Ver estado de tareas (en tiempo, próxima a vencer, vencida)

### 📤 Sistema de Entregas
- Subir archivos mediante URLs
- Agregar comentarios a las entregas
- Editar entregas existentes
- Ver historial de entregas

### 📊 Calificaciones
- Calificar entregas (escala 0-20)
- Ver notas asignadas
- Estado de calificación (pendiente, calificado)

### 📈 Estadísticas
- Total de tareas
- Tareas en tiempo
- Tareas próximas a vencer
- Progreso general

## 🎨 Personalización

El diseño utiliza variables CSS que pueden ser fácilmente modificadas en `src/index.css`:

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #7c3aed;
  /* ... más variables */
}
```

## 🚀 Despliegue

### Docker
```bash
# Construir imagen
docker build -t academia-digital-frontend .

# Ejecutar contenedor
docker run -p 3000:80 academia-digital-frontend
```

### Producción
```bash
npm run build
# Los archivos se generan en dist/
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Para soporte técnico o preguntas sobre el nuevo diseño, contactar al equipo de desarrollo.

---

**🎓 Academia Digital** - Transformando la educación con tecnología moderna
