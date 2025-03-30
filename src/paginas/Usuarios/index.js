import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { excluirUsuarioPeloId, listarUsuarios } from "../../servicos/usuarios";
import { useNavigate } from "react-router-dom";
import Modal from "../../componentes/Modal";

function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [usuarioParaExcluir, setUsuarioParaExcluir] = useState({});

    useEffect(() => {
        listarUsuarios(setUsuarios);
    }, []);

    const confirmarExclusao = (id) => {
        setExibirModal(true);
        setUsuarioParaExcluir(id);
    }

    const cancelarExclusao = () => {
        setExibirModal(false);
        setUsuarioParaExcluir({});
    }

    const excluirUsuario = async () => {
        await excluirUsuarioPeloId(usuarioParaExcluir, setExibirModal);

        setUsuarioParaExcluir({});
        setUsuarios(usuarios.filter(u => u.id !== usuarioParaExcluir));
    }

    return (
        <>
            <Cabecalho />

            <section className="container mt-3" id="usuarios">
                <div className="d-flex justify-content-between">
                    <h1>Usuarios Cadastrados</h1>
                    <div>
                        <a role="button" href="/novo-usuario" className="btn btn-primary">
                            Novo Usuario
                        </a>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Opcoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios?.map((usuario) => (
                                <tr key={usuario.id}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.cpf}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.idade}</td>
                                    <td>{usuario.status}</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => navigate(`/usuario/${usuario.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => confirmarExclusao(usuario.id)}
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
                    texto={"Tem certeza que deseja excluir este usuario?"}
                    txtBtn01={"Sim, excluir."}
                    onClickBtn01={excluirUsuario}
                    txtBtn02={"Cancelar"}
                    onClickBtn02={cancelarExclusao}
                />
            )}

            <Rodape />
        </>
    );
}

export default Usuarios;