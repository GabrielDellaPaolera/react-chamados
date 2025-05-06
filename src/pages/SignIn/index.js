import './signin.css';
import { useState,useContext } from 'react';       

import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() { 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {signIn, loadingAuth} = useContext(AuthContext); // Importando o contexto de autenticação

    async function handleSignIn(e) {

        e.preventDefault(); // Previne o comportamento padrão do formulário

        if(email !== '' || password !== '') {
          await signIn(email,password); // Chama a função de autenticação
        }   
    }

    return (
    <div className="container-center">
        <div className="Login">
            <div className="Login-area">
                <img src={logo} alt="Logo do sistema de chamados" />  
            </div>

      <form onSubmit={handleSignIn}>
        <h1> Entrar </h1>
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
        {loadingAuth ? 'Carregando...' : 'Acessar' }    
         </button>

        </form>

        <Link to="/register"> Criar uma conta </Link>
        <Link to="/signUp"> Esqueci minha senha </Link>

            </div>  
        </div>
    );
}   