import avatarImg from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'
import {FiHome, FiUser, FiSettings} from 'react-icons/fi' // Importando os ícones do react-icons    
import  './header.css' // Importando o css do header

export default function Header() {
    
  const {user} =   useContext(AuthContext) // Pegando o usuário do contexto de autenticação
    return (
        <div className="sidebar">
            <div>
                <img src= {user.avatarUrl === null ? avatarImg : user.avatarUrl} alt= "Foto do usuario" />
             </div>


        <Link to = "/dashboard">
            <FiHome color="#FFF" size={24} />
            Chamados
        </Link>
        <Link to = "/costumers">
            <FiHome color="#FFF" size={24} />
            Clientes
        </Link>

        <Link to = "/profile">
            <FiHome color="#FFF" size={24} />
            Perfil
        </Link>

        </div>

    )
}