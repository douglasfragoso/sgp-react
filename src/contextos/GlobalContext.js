import { createContext, useState, useEffect } from "react";
import { authService } from "../servicos/login"; 

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const verificarAutenticacao = async () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                try {
                    const usuario = await authService.getUsuario();
                    setUsuarioLogado(usuario);
                } catch (error) {
                    logout();
                }
            }
            setCarregando(false);
        };

        verificarAutenticacao();
    }, []);

    const login = async (email, senha, manterConectado) => {
        try {
            const dadosUsuario = await authService.login(email, senha);
            setUsuarioLogado(dadosUsuario.usuario);
            
            if (manterConectado) {
                localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario.usuario));
            } else {
                sessionStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario.usuario));
            }
            
            return dadosUsuario;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUsuarioLogado(null);
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");
    };

    return (
        <GlobalContext.Provider value={{ usuarioLogado, carregando, login, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};