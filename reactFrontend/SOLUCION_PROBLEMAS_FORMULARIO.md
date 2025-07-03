# 🔧 Solución de Problemas - Formulario de Tareas

## ❌ Problema Identificado

Al crear o editar una tarea, la página se recarga y no pasa nada. El formulario no funciona correctamente.

## 🔍 Análisis del Problema

### **Causas Identificadas:**

1. **Validación de roles incorrecta**: Se verificaba `TEACHER` en lugar de `PROFESSOR`
2. **Campos faltantes en el DTO**: El backend requiere `status` y `maxGrade`
3. **Manejo de errores deficiente**: No se usaba el sistema de notificaciones
4. **Validaciones de fecha insuficientes**: No se validaban fechas correctamente

## ✅ Soluciones Implementadas

### 1. **Validación de Roles Corregida**
```javascript
// ANTES (incorrecto)
if (!user || (user.role !== "TEACHER" && user.role !== "professor")) {

// DESPUÉS (correcto)
if (!user || user.role !== "PROFESSOR") {
```

### 2. **Campos del Formulario Completos**
```javascript
const [form, setForm] = useState({
  title: "",
  description: "",
  publicationDate: "",
  dueDate: "",
  status: "ACTIVE",        // ✅ Agregado
  maxGrade: 20.0,          // ✅ Agregado
});
```

### 3. **Sistema de Notificaciones Integrado**
```javascript
import { useNotificationContext } from "../../context/NotificationContext";
const { showSuccess, showError } = useNotificationContext();

// Uso en operaciones
showSuccess("Tarea creada correctamente");
showError("Error al crear la tarea");
```

### 4. **Validaciones Mejoradas**
```javascript
// Validación de fechas
if (publicationDate < now) {
  showError("La fecha de publicación no puede ser anterior a la fecha actual");
  return;
}

if (dueDate <= publicationDate) {
  showError("La fecha de vencimiento debe ser posterior a la fecha de publicación");
  return;
}

// Validación de nota máxima
if (form.maxGrade < 0 || form.maxGrade > 20) {
  showError("La nota máxima debe estar entre 0 y 20");
  return;
}
```

### 5. **Manejo de Estados Mejorado**
```javascript
// Campos deshabilitados durante carga
disabled={loading}

// Indicador de carga en botón
{loading ? (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <div className="loading-spinner"></div>
    <span>{isEdit ? 'Actualizando...' : 'Creando...'}</span>
  </div>
) : (
  <span>{isEdit ? '💾 Actualizar Tarea' : '🚀 Crear Tarea'}</span>
)}
```

## 🧪 Campos del Formulario

### **Campos Requeridos por el Backend:**
1. **title** (String): Título de la tarea (5-200 caracteres)
2. **description** (String): Descripción detallada (mínimo 10 caracteres)
3. **publicationDate** (LocalDateTime): Fecha de publicación
4. **dueDate** (LocalDateTime): Fecha de vencimiento
5. **status** (TaskStatus): Estado de la tarea (ACTIVE/INACTIVE/DRAFT)
6. **maxGrade** (Double): Nota máxima (0-20)

### **Validaciones del Frontend:**
- ✅ Título: 5-200 caracteres
- ✅ Descripción: Mínimo 10 caracteres
- ✅ Fecha publicación: No puede ser anterior a hoy
- ✅ Fecha vencimiento: Debe ser posterior a publicación
- ✅ Nota máxima: Entre 0 y 20
- ✅ Estado: Selección obligatoria

## 🚀 Flujo de Creación/Edición

### **Crear Nueva Tarea:**
1. Usuario hace clic en "✨ Nueva Tarea"
2. Se valida que sea profesor (`PROFESSOR`)
3. Se muestra formulario vacío con valores por defecto
4. Usuario llena campos requeridos
5. Se validan fechas y nota máxima
6. Se envía payload completo al backend
7. Se muestra notificación de éxito
8. Se redirige a lista de tareas

### **Editar Tarea Existente:**
1. Usuario hace clic en "✏️ Editar"
2. Se valida que sea profesor (`PROFESSOR`)
3. Se carga tarea existente del backend
4. Se llenan campos con datos actuales
5. Usuario modifica campos necesarios
6. Se validan fechas y nota máxima
7. Se envía payload actualizado al backend
8. Se muestra notificación de éxito
9. Se redirige a lista de tareas

## 🔧 Debugging

### **Verificar en el Navegador:**
1. Abrir **DevTools** (F12)
2. Ir a **Console**
3. Buscar errores relacionados con:
   - Validación de roles
   - Campos faltantes
   - Errores de red

### **Verificar en el Backend:**
1. Revisar logs del servidor Spring Boot
2. Verificar que el endpoint `/api/tasks` responde correctamente
3. Confirmar que el usuario tiene rol `PROFESSOR`

### **Verificar Payload:**
```javascript
// Payload correcto que se debe enviar
{
  title: "Título de la tarea",
  description: "Descripción detallada...",
  publicationDate: "2024-01-15T10:00:00",
  dueDate: "2024-01-20T18:00:00",
  status: "ACTIVE",
  maxGrade: 20.0
}
```

## 📋 Checklist de Verificación

- [ ] Usuario tiene rol `PROFESSOR`
- [ ] Formulario carga correctamente
- [ ] Todos los campos están presentes
- [ ] Validaciones funcionan
- [ ] Notificaciones aparecen
- [ ] Redirección funciona
- [ ] Tarea se crea/actualiza en el backend
- [ ] Lista de tareas se actualiza

## 🎯 Próximas Mejoras

1. **Auto-guardado**: Guardar borradores automáticamente
2. **Vista previa**: Mostrar cómo se verá la tarea
3. **Plantillas**: Tareas predefinidas para reutilizar
4. **Adjuntos**: Permitir subir archivos
5. **Categorías**: Organizar tareas por categorías

---

**Estado**: ✅ Corregido
**Fecha**: Actualizado
**Versión**: Frontend v2.1 