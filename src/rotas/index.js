import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../paginas/Login";
import Pagina404 from "../paginas/Pagina404";
import Usuarios from "../paginas/Usuarios";
import UsuarioForm from "../paginas/Usuarios/UsuarioForm";
import Tarefas from "../paginas/Tarefas";
import TarefaForm from "../paginas/Tarefas/TarefaForm";
import Projetos from "../paginas/Projetos";
import ProjetoForm from "../paginas/Projetos/ProjetoForm";
import Dashboard from "../paginas/Dashboard";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/novo-usuario" element={<UsuarioForm />} />
                <Route path="/usuario/:id" element={<UsuarioForm />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/novo-projeto" element={<ProjetoForm />} />
                <Route path="/projeto/:id" element={<ProjetoForm />} />
                <Route path="/tarefas" element={<Tarefas />} />
                <Route path="/nova-tarefa" element={<TarefaForm />} />
                <Route path="/tarefa/:id" element={<TarefaForm />} />
                <Route path="*" element={<Pagina404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;