import { api } from "./api";

export async function salvarUsuario(dadosUsuario, setExibirModal) {
    await api.post('/usuarios', dadosUsuario)
        .then((resposta) => {
            if (resposta.status === 201) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar usuario.");
            console.error("Erro ao cadastro usuario: ", erro);
        });
}

export async function atualizarUsuario(id, dadosUsuario, setExibirModal) {
    await api.put(`/usuarios/${id}`, dadosUsuario)
        .then((resposta) => {
            if (resposta.status === 200) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao atualizar usuario.");
            console.error("Erro ao atualizar usuario: ", erro);
        });
}

export async function listarUsuarios(setUsuarios) {
    await api.get('/usuarios')
        .then((resposta) => {
            if (resposta.status === 200) {
                setUsuarios(resposta.data.content)
            }
        })
        .catch((erro) => {
            alert("Erro ao listar usuarios.");
            console.error("Erro ao listar usuarios: ", erro);
        });
}

export async function obterUsuarioPeloId(
    id,
    setNome,
    setCpf,
    setDataNascimento,
    setEmail,
    setSenha,
    setStatus
) {
    await api.get(`/usuarios/${id}`)
        .then((resposta) => {
            if (resposta.status === 200) {
                setNome(resposta.data.nome);
                setCpf(resposta.data.cpf);
                setDataNascimento(resposta.data.dataNascimento);
                setEmail(resposta.data.email);
                setSenha(resposta.data.senha);
                setStatus(resposta.data.status);
            }
        })
        .catch((erro) => {
            alert("Erro ao obter usuario.");
            console.error("Erro ao obter usuario: ", erro);
        });
}

export async function excluirUsuarioPeloId(id, setExibirModal) {
    await api.delete(`/usuarios/${id}`)
        .then((resposta) => {
            if (resposta.status === 204) {
                setExibirModal(false);
            }
        })
        .catch((erro) => {
            alert("Erro ao excluir usuario.");
            console.error("Erro ao excluir usuario: ", erro);
        });
}