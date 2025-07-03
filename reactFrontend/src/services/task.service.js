import axiosInstance from "../utils/axiosInstance";

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tareas:", error);
    throw new Error("Error obteniendo lista de tareas");
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tarea:", error);
    throw new Error("Error obteniendo información de la tarea");
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creando tarea:", error);
    throw new Error(error.response?.data?.message || "Error creando tarea");
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando tarea:", error);
    throw new Error(error.response?.data?.message || "Error actualizando tarea");
  }
};

export const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Error eliminando tarea:", error);
    throw new Error("Error eliminando tarea");
  }
};

export const getTasksByStatus = async (status) => {
  try {
    const response = await axiosInstance.get(`/tasks/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tareas por estado:", error);
    throw new Error("Error obteniendo tareas por estado");
  }
};

export const getTasksByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/tasks/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tareas del usuario:", error);
    throw new Error("Error obteniendo tareas del usuario");
  }
};

export const getTasksByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/tasks/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tareas por categoría:", error);
    throw new Error("Error obteniendo tareas por categoría");
  }
};
