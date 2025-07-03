import axiosInstance from "../utils/axiosInstance";

export const getStatistics = async () => {
  try {
    const response = await axiosInstance.get("/statistics");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    throw new Error("Error obteniendo estadísticas");
  }
};

export const getTaskStatistics = async () => {
  try {
    const response = await axiosInstance.get("/statistics/tasks");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo estadísticas de tareas:", error);
    throw new Error("Error obteniendo estadísticas de tareas");
  }
};

export const getUserStatistics = async () => {
  try {
    const response = await axiosInstance.get("/statistics/users");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo estadísticas de usuarios:", error);
    throw new Error("Error obteniendo estadísticas de usuarios");
  }
};

export const getSubmissionStatistics = async () => {
  try {
    const response = await axiosInstance.get("/statistics/submissions");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo estadísticas de submissions:", error);
    throw new Error("Error obteniendo estadísticas de submissions");
  }
};

export const getPerformanceMetrics = async () => {
  try {
    const response = await axiosInstance.get("/statistics/performance");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo métricas de rendimiento:", error);
    throw new Error("Error obteniendo métricas de rendimiento");
  }
}; 