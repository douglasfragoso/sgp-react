function Botao({ cor = "primary", tamanho = "md", aoClicar, texto }) {
    return (
        <button className={`btn btn-${cor} btn-${tamanho}`} onClick={aoClicar}>
            {texto}
        </button>
    )
}

export default Botao;