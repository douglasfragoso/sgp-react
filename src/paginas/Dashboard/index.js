import React, { useEffect, useState } from 'react';
import { listarUsuarios } from '../../servicos/usuarios';
import { listarProjetos } from '../../servicos/projetos';
import { listarTarefas } from '../../servicos/tarefas';
import Cabecalho from '../../componentes/Cabecalho';
import Rodape from '../../componentes/Rodape';


function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    listarUsuarios(setUsuarios);
    listarProjetos(setProjetos);
    listarTarefas(setTarefas);
  }, []);

  const usuariosAtivos = Array.isArray(usuarios) ? usuarios.filter(usuario => usuario.status === 'ATIVO').length : 0;
  const usuariosInativos = Array.isArray(usuarios) ? usuarios.filter(usuario => usuario.status === 'INATIVO').length : 0;

  return (
    <>
      <Cabecalho />

      <section className="container mt-3" id="dashboard">
        <h1>Dashboard</h1>

        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Usuários Ativos</h5>
                <p className="card-text">{usuariosAtivos}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Usuários Inativos</h5>
                <p className="card-text">{usuariosInativos}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Projetos Cadastrados</h5>
                <p className="card-text">{Array.isArray(projetos) ? projetos.length : 0}</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tarefas Cadastradas</h5>
                <p className="card-text">{Array.isArray(tarefas) ? tarefas.length : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Rodape />
    </>
  );
}

export default Dashboard;
