import Alerta from "../../componentes/Alerta";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import robo from "../../arquivos/imagens/robo_404.png";

function Pagina404() {
    return (
        <>
            <Cabecalho />

            <div className="container mt-3">
                <Alerta cor="warning" mensagem="Esta pagina nao existe!" />
                <div className="d-flex justify-content-center">
                    <img src={robo} alt="Erro 404 - Not Found" width={"30%"} />
                </div>
            </div>

            <Rodape />
        </>
    );
}

export default Pagina404;