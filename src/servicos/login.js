import { api } from "./api";

export const authService = {
    async login(email, senha) {
        try {
            const response = await api.post('/auth/v1/login', { email, senha });
            if (response.data.token) {
                localStorage.setItem("jwtToken", response.data.token);
                return response.data;
            }
            throw new Error("Token não recebido");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    },
    
    logout() {
        localStorage.removeItem("jwtToken");
        delete api.defaults.headers.common['Authorization'];
    },
};