import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../arquivos/imagens/sgp_logo_horizontal.png";
import Botao from "../Botao";
import { GlobalContext } from "../../contextos/GlobalContext";

function Cabecalho() {
    const navigate = useNavigate();
    const { logout, usuarioLogado } = useContext(GlobalContext);
    

    const handleLogout = () => {
        logout();
        navigate("/"); 
    };;

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu-lateral"
                    aria-controls="menu-lateral"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu-lateral">
                    <a className="navbar-brand" href="/dashboard">
                        <img src={logo} alt="Sistema de Gestão de Projetos" width="200px" />
                    </a>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {usuarioLogado && usuarioLogado.role === "ADMIN" && (
                            <li className="nav-item">
                                <a className="nav-link active" href="/dashboard">Dashboard</a>
                            </li>
                        )}
                        {usuarioLogado && usuarioLogado.role === "ADMIN" && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/usuarios">Usuários</a>
                                </li>
                            )}
                        {usuarioLogado && (
                            <li className="nav-item">
                                <a className="nav-link" href="/projetos">Projetos</a>
                            </li>
                        )}
                        {usuarioLogado && (
                            <li className="nav-item">
                                <a className="nav-link" href="/tarefas">Tarefas</a>
                            </li>
                        )}
                        </ul>

                        <div className="d-flex align-items-center">

                                <Botao 
                                    texto="Sair" 
                                    aoClicar={handleLogout}
                                    cor="danger"
                                />
                            </div>
                </div>
            </div>
        </nav>
    );
}

export default Cabecalho;