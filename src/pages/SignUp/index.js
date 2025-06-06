import logo from '../../assets/logo.png';
import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';




export default function SignUp() { 
    const [name,setName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext); // Importando o contexto de autenticação

    async function handleSubmit(e) {
        e.preventDefault();

        if (name !== '' &&  email !== '' && password !== '') {
            await signUp(email,password,name); // Chama a função de autenticação
        }

}


    return (
    <div className="container-center">
        <div className="Login">
            <div className="Login-area">
                <img src={logo} alt="Logo do sistema de chamados" />  
            </div>

      <form onSubmit={handleSubmit}>
        <h1>Nova conta</h1>
        <input 
        type = "text" 
        placeholder="Seu nome"
        value = {name}
        onChange = { (e) => setName(e.target.value) }
        />   


        <input 
        type = "text" 
        placeholder="Digite seu e-mail"
        value = {email}
        onChange = { (e) => setEmail(e.target.value) } 
        />   

        <input 
        type = "password" 
        placeholder="******"
        value = {password}
        onChange = { (e) => setPassword(e.target.value) } 
        />       

        <button type="submit"> 
        {loadingAuth ? 'Carregando...' : 'Cadastrar' }
        </button>

        </form>

        <Link to="/register"> Já possui uma conta ? Faça login </Link>

            </div>  
        </div>
    );
}   