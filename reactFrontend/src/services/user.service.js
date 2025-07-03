import axiosInstance from "../utils/axiosInstance";

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario actual:", error);
    throw new Error("Error obteniendo información del usuario");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw new Error("Error obteniendo lista de usuarios");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw new Error("Error obteniendo información del usuario");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw new Error(error.response?.data?.message || "Error creando usuario");
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw new Error(error.response?.data?.message || "Error actualizando usuario");
  }
};

export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw new Error("Error eliminando usuario");
  }
};

export const getUsersByRole = async (role) => {
  try {
    const response = await axiosInstance.get(`/users/role/${role}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios por rol:", error);
    throw new Error("Error obteniendo usuarios por rol");
  }
};
