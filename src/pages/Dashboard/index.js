import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";


export default function Dashboard(){

const {logout} = useContext(AuthContext); // Pegando a função de logout do contexto de autenticação

    async function handleLogout() {
        await logout(); // Chama a função de logout
    }

    return(
        <div>

            <Header /> 
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Sair da conta </button>
        </div>
    )      
}