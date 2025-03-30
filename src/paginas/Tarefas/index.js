import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { excluirTarefaPeloId, listarTarefas } from "../../servicos/tarefas";
import { useNavigate } from "react-router-dom";
import Modal from "../../componentes/Modal";

function Tarefas() {
    const navigate = useNavigate();
    const [tarefas, setTarefas] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [tarefaParaExcluir, setTarefaParaExcluir] = useState({});

    useEffect(() => {
        listarTarefas(setTarefas);
    }, []);

    const confirmarExclusao = (id) => {
        setExibirModal(true);
        setTarefaParaExcluir(id);
    }

    const cancelarExclusao = () => {
        setExibirModal(false);
        setTarefaParaExcluir({});
    }

    const excluirTarefa = async () => {
        await excluirTarefaPeloId(tarefaParaExcluir, setExibirModal);

        setTarefaParaExcluir({});
        setTarefas(tarefas.filter(u => u.id !== tarefaParaExcluir));
    }

    return (
        <>
            <Cabecalho />

            <section className="container mt-3" id="tarefas">
                <div className="d-flex justify-content-between">
                    <h1>Tarefas Cadastradas</h1>
                    <div>
                        <a role="button" href="/nova-tarefa" className="btn btn-primary">
                            Nova Tarefa
                        </a>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Data de Criacao</th>
                            <th scope="col">Data de Conclusao</th>
                            <th scope="col">Prioridade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Projeto</th>
                            <th scope="col">Opcoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tarefas?.map((tarefa) => (
                            <tr key={tarefa.id}>
                                <th scope="row">{tarefa.id}</th>
                                <td>{tarefa.titulo}</td>
                                <td>{tarefa.dataCriacao}</td>
                                <td>{tarefa.dataConclusao}</td>
                                <td>{tarefa.prioridade}</td>
                                <td>{tarefa.status}</td>
                                <td>{tarefa.projeto?.nome}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/tarefa/${tarefa.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => confirmarExclusao(tarefa.id)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </section>

            {exibirModal && (
                <Modal
                    titulo={"Confirmacao de Exclusao"}
                    texto={"Tem certeza que deseja excluir este tarefa?"}
                    txtBtn01={"Sim, excluir."}
                    onClickBtn01={excluirTarefa}
                    txtBtn02={"Cancelar"}
                    onClickBtn02={cancelarExclusao}
                />
            )}

            <Rodape />
        </>
    );
}

export default Tarefas;