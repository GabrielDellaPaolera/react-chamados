import { useContext } from "react";
import { Navigate} from "react-router-dom";
import { AuthContext } from "../contexts/auth"; // Importando o contexto de autenticação


export default function Private ({children}) {

    const { signed,loading } = useContext(AuthContext); // Pegando o estado de autenticação do contexto

    if(loading) { // Se o estado de autenticação estiver carregando
        return null; // Retorna null para não renderizar nada
    }


    if(!signed) { // Se o usuário não estiver autenticado
        return <Navigate to="/" /> // Redireciona para a página de login
    }
    
    // Se o usuário estiver autenticado, renderiza os filhos (as páginas filhas)
return children;
}