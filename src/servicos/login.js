import { api } from "./api";

export const authService = {
    async login(credentials) {
        try {
            const response = await api.post('/auth/v1/login', credentials);
            const { token, user } = response.data;
            
            const storage = credentials.manterConectado ? localStorage : sessionStorage;
            storage.setItem('token', token);
            storage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error) {
            let errorMessage = 'Erro ao fazer login';
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'Sem resposta do servidor';
            } else {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    },

    getCurrentUser() {
        const user =
            localStorage.getItem('user') ||
            sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!(
            localStorage.getItem('token') ||
            sessionStorage.getItem('token')
        );
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
};