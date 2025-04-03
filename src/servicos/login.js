// src/servicos/authService.js
import { api } from "./api";
import { jwtDecode } from 'jwt-decode';

export const authService = {
    async login(email, senha) {
        try {
            const response = await api.post('/auth/v1/login', { email, senha });
            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem("jwtToken", token);
                
                const decoded = jwtDecode(token);
                const userData = {
                    nome: response.data.nome || decoded.nome,
                    role: response.data.role || decoded.role,
                    token: token
                };
                
                return userData;
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
    
    getCurrentUser() {
        const token = localStorage.getItem("jwtToken");
        if (!token) return null;
        
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    }
};