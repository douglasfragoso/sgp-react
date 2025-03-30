import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState({});

    const login = (dadosUsuario) => {
        setUsuarioLogado(dadosUsuario);

        // Chamada a API de autenticacao

        if (dadosUsuario?.manterConectado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
        } else {
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
        }

        // TODO: Redirecionar para a tela inicial
    }

    const logout = () => {
        setUsuarioLogado({});
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");

        // TODO: Redirecionar para a tela de login
    }

    return (
        <GlobalContext.Provider value={{ usuarioLogado, login, logout }}>
            {children}
        </GlobalContext.Provider>
    )
}

