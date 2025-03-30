import './login.css';
import logo from '../../arquivos/imagens/sgp_logo_vertical.png';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../contextos/GlobalContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [manterConectado, setManterConectado] = useState(true);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const fazerLogin = async (e) => {
        e.preventDefault();

        if (email === '' || senha === '') {
            setErro("Preencha todos os campos!");
            return;
        }

        setErro('');

        try {
            await login({ email, senha, manterConectado });
        } catch (error) {
            setErro(error.message);
        }
    }

    return (
        <div className="bg-container">
            <div className='container'>
                <div className='row justify-content-center'>
                    <form className='col-md-5 col-10 login-container' onSubmit={fazerLogin}>
                        <div className='row justify-content-center my-4'>
                            <div className='col-8'>
                                <div className='d-flex justify-content-center'>
                                    <img src={logo} alt="Sistema de Gerenciamento de Projetos" width="200px" />
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <span className='text-danger mb-2'>{erro}</span>
                                </div>

                                <input
                                    type='email'
                                    className='form-control border border-primary mb-2'
                                    placeholder='E-mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    type='password'
                                    className='form-control border border-primary mb-2'
                                    placeholder='Senha'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />

                                <div className='form-check text-start my-3'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultChecked={manterConectado}
                                        onChange={() => setManterConectado(!manterConectado)}
                                    />
                                    <label className='form-check-label text-dark'>
                                        Matenha-me conectado
                                    </label>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <button type='submit' className='btn btn-primary mt-2 mx-2 px-4'
                                    onClick={() => navigate("/projetos")}>Acessar</button>
                                    
                                    <button type="button" className='btn btn-secondary mt-2 px-3'
                                    onClick={() => navigate("/novo-usuario")}>
                                        Novo Usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;