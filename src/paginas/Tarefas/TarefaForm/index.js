import { useEffect, useState, useContext } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import Rodape from "../../../componentes/Rodape";
import Modal from "../../../componentes/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { atualizarTarefa, obterTarefaPeloId, salvarTarefa } from "../../../servicos/tarefas";
import { formatarData } from "../../../utils/data";
import { listarProjetos } from "../../../servicos/projetos";
import { listarUsuarios } from "../../../servicos/usuarios";
import { GlobalContext } from "../../../contextos/GlobalContext";

function TarefaForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [dataCriacao, setDataCriacao] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [status, setStatus] = useState("");
    const [projetoId, setProjetoId] = useState("");
    const [projetos, setProjetos] = useState([]);
    const [usuarioId, setUsuarioId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const { usuarioLogado } = useContext(GlobalContext);

    useEffect(() => {
        if (id) {
            obterTarefaPeloId(id, setTitulo, setDataCriacao, setDataConclusao, setUsuarioId, setPrioridade, setStatus, setProjetoId);
        }

        listarProjetos(setProjetos);
        listarUsuarios(setUsuarios);
    }, []);

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const dadosTarefa = {
            titulo,
            dataCriacao: formatarData(dataCriacao),
            dataConclusao: formatarData(dataConclusao),
            prioridade,
            status,
            projeto: {
                id: projetoId
            },
            usuario: {
                id: usuarioId,
                role: usuarioLogado.role
            }
        }

        console.log(dadosTarefa);

        if (id) {
            await atualizarTarefa(id, dadosTarefa, setExibirModal);
        } else {
            await salvarTarefa(dadosTarefa, setExibirModal);
        }
    }

    const cancelar = () => {
        navigate("/tarefas");
    }

    const confirmarCadastro = () => {
        setExibirModal(false);
        navigate("/tarefas");
    }

    return (
        <>
            <Cabecalho />

            <section className="container mt-3" id="tarefa-form">
                <h1>Dados da Tarefa</h1>
                {usuarioLogado && usuarioLogado.role === "ADMIN" && (
                <form className="row g-3" onSubmit={enviarFormulario}>
                    <div className="col-12">
                        <label htmlFor="titulo" className="form-label">Titulo:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            placeholder="Digite o titulo da tarefa"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="dataCriacao" className="form-label">Data de Criacao:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataCriacao"
                            value={dataCriacao}
                            onChange={(e) => setDataCriacao(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-4 col-12">
                        <label htmlFor="dataConclusao" className="form-label">Data de Conclusao:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataConclusao"
                            value={dataConclusao}
                            onChange={(e) => setDataConclusao(e.target.value)}
                        />
                    </div>
                    
                    <div className="col-md-4 col-12">
                        <label htmlFor="usuario" className="form-label">Atribuir para:</label>
                        <select
                            id="usuario"
                            className="form-select"
                            value={usuarioId}
                            onChange={(e) => setUsuarioId(e.target.value)}
                            required
                        >
                            <option disabled value="">Escolha uma opcao...</option>
                            {usuarios?.map((usuario) => (
                                <option value={usuario.id} key={usuario.id}>{usuario.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="prioridade" className="form-label">Prioridade</label>
                        <select
                            id="prioridade"
                            className="form-select"
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                            required
                        >
                            <option disabled value="">Escolha uma opcao...</option>
                            <option value={"ALTA"}>Alta</option>
                            <option value={"MEDIA"}>Media</option>
                            <option value={"BAIXA"}>Baixa</option>
                        </select>
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option disabled value="">Escolha uma opcao...</option>
                            <option value={"PENDENTE"}>Pendente</option>
                            <option value={"FAZENDO"}>Fazendo</option>
                            <option value={"FINALIZADA"}>Finalizada</option>
                        </select>
                    </div>

                    <div className="col-md-4 col-12">
                        <label htmlFor="projeto" className="form-label">Projeto:</label>
                        <select
                            id="projeto"
                            className="form-select"
                            value={projetoId}
                            onChange={(e) => setProjetoId(e.target.value)}
                            required
                        >
                            <option disabled value="">Escolha uma opcao...</option>
                            {projetos?.map((projeto) => (
                                <option value={projeto.id} key={projeto.id}>{projeto.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Salvar</button>
                        <button className="btn btn-outline-primary ms-2" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
                )}
                {exibirModal && (
                    <Modal
                        titulo={"Confirmacao"}
                        texto={`Tarefa ${id ? 'atualizada' : 'cadastrada'} com sucesso!`}
                        txtBtn01={"OK"}
                        onClickBtn01={confirmarCadastro}
                    />
                )}
            </section>

            <Rodape />
        </>
    );
}

export default TarefaForm;