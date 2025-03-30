function Alerta({ cor = "primary", mensagem = "" }) {
    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-8 col-12">
                <div className={`alert alert-${cor}`}>
                    {mensagem}
                </div>
            </div>
        </div>
    )
}

export default Alerta;