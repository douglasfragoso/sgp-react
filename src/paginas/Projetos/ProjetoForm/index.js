import { useEffect, useState, useContext } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import Rodape from "../../../componentes/Rodape";
import Modal from "../../../componentes/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { atualizarProjeto, obterProjetoPeloId, salvarProjeto } from "../../../servicos/projetos";
import { listarUsuarios } from "../../../servicos/usuarios";
import { excluirTarefaPeloId } from "../../../servicos/tarefas";
import { GlobalContext } from "../../../contextos/GlobalContext";

function ProjetoForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [responsavelId, setResponsavelId] = useState("");
    const [tarefas, setTarefas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [tarefaParaExcluir, setTarefaParaExcluir] = useState({});
    const [exibirModalSalvar, setExibirModalSalvar] = useState(false);
    const [exibirModalExcluir, setExibirModalExcluir] = useState(false);
    const { usuarioLogado } = useContext(GlobalContext);

    useEffect(() => {
        if (id) {
            obterProjetoPeloId(id, setNome, setDescricao, setResponsavelId, setTarefas);
        }

        listarUsuarios(setUsuarios);
    }, []);

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const dadosProjeto = {
            nome,
            descricao,
            responsavel: {
                id: responsavelId,
                role: usuarioLogado.role
            }
        }

        console.log(dadosProjeto);

        if (id) {
            await atualizarProjeto(id, dadosProjeto, setExibirModalSalvar);
        } else {
            await salvarProjeto(dadosProjeto, setExibirModalSalvar);
        }
    }

    const cancelar = () => {
        navigate("/projetos");
    }

    const confirmarCadastro = () => {
        setExibirModalSalvar(false);
        navigate("/projetos");
    }

    const confirmarExclusao = (id) => {
        setExibirModalExcluir(true);
        setTarefaParaExcluir(id);
    }

    const cancelarExclusao = () => {
        setExibirModalExcluir(false);
        setTarefaParaExcluir({});
    }

    const excluirTarefa = async () => {
        await excluirTarefaPeloId(tarefaParaExcluir, setExibirModalExcluir);

        setTarefaParaExcluir({});
        setTarefas(tarefas.filter(t => t.id !== tarefaParaExcluir));
    }

    return (
        <>
            <Cabecalho />

            <section className="container mt-3" id="projeto-form">
                <h1>Dados do Projeto</h1>
                {usuarioLogado && usuarioLogado.role === "ADMIN" && (
                <form className="row g-3" onSubmit={enviarFormulario}>
                    <div className="col-12">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Digite o nome do projeto"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="descricao" className="form-label">Descricao:</label>
                        <textarea
                            type="text"
                            rows={5}
                            className="form-control"
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="responsavel" className="form-label">Responsavel:</label>
                        <select
                            id="responsavel"
                            className="form-select"
                            value={responsavelId}
                            onChange={(e) => setResponsavelId(e.target.value)}
                            required
                        >
                            <option disabled value="">Escolha um usuario...</option>
                            {usuarios?.map((usuario) => (
                                <option value={usuario.id} key={usuario.id}>
                                    {usuario.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Salvar</button>
                        <button className="btn btn-outline-primary ms-2" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
                )}
                <section className="container mt-3" id="tarefas">
                    <div className="d-flex justify-content-between">
                        <h2>Tarefas Associadas</h2>
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
                                <th scope="col">Prioridade</th>
                                <th scope="col">Status</th>
                                <th scope="col">Atribuido para</th>
                                <th scope="col">Opcoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tarefas?.map((tarefa) => (
                                <tr key={tarefa.id}>
                                    <th scope="row">{tarefa.id}</th>
                                    <td>{tarefa.titulo}</td>
                                    <td>{tarefa.prioridade}</td>
                                    <td>{tarefa.status}</td>
                                    <td>{tarefa.usuario?.nome}</td>
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
                            ))}
                        </tbody>
                    </table>
                </section>
                
                {exibirModalSalvar && (
                    <Modal
                        titulo={"Confirmacao"}
                        texto={`Projeto ${id ? 'atualizado' : 'cadastrado'} com sucesso!`}
                        txtBtn01={"OK"}
                        onClickBtn01={confirmarCadastro}
                    />
                )}

                {exibirModalExcluir && (
                    <Modal
                        titulo={"Confirmacao de Exclusao"}
                        texto={"Tem certeza que deseja excluir esta tarefa?"}
                        txtBtn01={"Sim, excluir."}
                        onClickBtn01={excluirTarefa}
                        txtBtn02={"Cancelar"}
                        onClickBtn02={cancelarExclusao}
                    />
                )}
            </section>

            <Rodape />
        </>
    );
}

export default ProjetoForm;