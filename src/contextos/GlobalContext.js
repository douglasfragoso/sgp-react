import { createContext, useState, useEffect } from "react";
import { authService } from '../servicos/login';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    // Verifica autenticação inicial ao carregar o contexto
    useEffect(() => {
        const verificarAutenticacao = async () => {
            try {
                const usuario = authService.getCurrentUser();
                if (usuario && authService.isAuthenticated()) {
                    setUsuario(usuario);
                }
            } catch (error) {
                console.error('Erro na verificação de autenticação:', error);
            } finally {
                setCarregando(false);
            }
        };
        
        verificarAutenticacao();
    }, []);

    const login = async (credenciais) => {
        try {
            const usuarioAutenticado = await authService.login(credenciais);
            setUsuario(usuarioAutenticado);
            return usuarioAutenticado;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    const logout = () => {
        authService.logout();
        setUsuario(null);
    }

    const valorContexto = {
        usuario,
        carregando,
        autenticado: authService.isAuthenticated(),
        login,
        logout
    }

    return (
        <GlobalContext.Provider value={valorContexto}>
            {children}
        </GlobalContext.Provider>
    )
}