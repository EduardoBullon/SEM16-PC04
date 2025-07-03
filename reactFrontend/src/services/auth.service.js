import axiosInstance from "../utils/axiosInstance";

const API_URL = "/auth";

export const login = async ({ username, password }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, { 
      username, 
      password 
    });
    
    const { token, message } = response.data;
    
    // Obtener información del usuario usando el token
    const user = await getUserByToken(token);
    
    return { token, user, message };
  } catch (error) {
    console.error("Error en login:", error);
    throw new Error(error.response?.data?.message || "Error de autenticación");
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/verify`, null, {
      params: { token }
    });
    return response.data;
  } catch (error) {
    console.error("Error verificando token:", error);
    return false;
  }
};

export const getUserByToken = async (token) => {
  try {
    const response = await axiosInstance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw new Error("Error obteniendo información del usuario");
  }
};