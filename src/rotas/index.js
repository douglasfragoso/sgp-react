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
import ProtecaoDeRotas from "../rotas/filtro";


function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/novo-usuario" element={<UsuarioForm />} />
                
                {/* Rotas protegidas */}
                <Route path="/dashboard" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <Dashboard />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/usuarios" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <Usuarios />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/novo-usuario" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <UsuarioForm />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/usuario/:id" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <UsuarioForm />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/projetos" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN', 'USER']}>
                        <Projetos />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/novo-projeto" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <ProjetoForm />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/projeto/:id" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <ProjetoForm />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/tarefas" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN', 'USER']}>
                        <Tarefas />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/nova-tarefa" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN']}>
                        <TarefaForm />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="/tarefa/:id" element={
                    <ProtecaoDeRotas allowedRoles={['ADMIN', 'USER']}>
                        <TarefaForm />
                    </ProtecaoDeRotas>
                } />
                
                <Route path="*" element={<Pagina404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;