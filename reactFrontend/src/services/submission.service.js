import axiosInstance from "../utils/axiosInstance";

export const getSubmissions = async () => {
  try {
    const response = await axiosInstance.get("/submissions");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo submissions:", error);
    throw new Error("Error obteniendo lista de submissions");
  }
};

export const getSubmissionById = async (id) => {
  try {
    const response = await axiosInstance.get(`/submissions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo submission:", error);
    throw new Error("Error obteniendo información de la submission");
  }
};

export const getSubmissionsByTask = async (taskId) => {
  try {
    const response = await axiosInstance.get(`/submissions/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo submissions por tarea:", error);
    throw new Error("Error obteniendo submissions por tarea");
  }
};

export const createSubmission = async (submissionData) => {
  try {
    const response = await axiosInstance.post("/submissions", submissionData);
    return response.data;
  } catch (error) {
    console.error("Error creando submission:", error);
    throw new Error(error.response?.data?.message || "Error creando submission");
  }
};

export const updateSubmission = async (id, submissionData) => {
  try {
    const response = await axiosInstance.put(`/submissions/${id}`, submissionData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando submission:", error);
    throw new Error(error.response?.data?.message || "Error actualizando submission");
  }
};

export const deleteSubmission = async (id) => {
  try {
    await axiosInstance.delete(`/submissions/${id}`);
  } catch (error) {
    console.error("Error eliminando submission:", error);
    throw new Error("Error eliminando submission");
  }
};

export const getSubmissionsByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/submissions/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo submissions del usuario:", error);
    throw new Error("Error obteniendo submissions del usuario");
  }
};

export const getSubmissionsByStatus = async (status) => {
  try {
    const response = await axiosInstance.get(`/submissions/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo submissions por estado:", error);
    throw new Error("Error obteniendo submissions por estado");
  }
};

export const gradeSubmission = async (id, grade, feedback) => {
  try {
    const response = await axiosInstance.put(`/submissions/${id}/grade`, {
      grade,
      feedback
    });
    return response.data;
  } catch (error) {
    console.error("Error calificando submission:", error);
    throw new Error(error.response?.data?.message || "Error calificando submission");
  }
};
