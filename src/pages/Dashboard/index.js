import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiMessageSquare,FiPlus, FiSearch , FiEdit2 } from "react-icons/fi";

import { Link } from "react-router-dom";

import'./dashboard.css'; // Importando o CSS do Dashboard

export default function Dashboard(){

const {logout} = useContext(AuthContext); // Pegando a função de logout do contexto de autenticação

    async function handleLogout() {
        await logout(); // Chama a função de logout
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name="Dashboard">
                    <FiMessageSquare size={25} />
                </Title>
                    <>
                    <Link to="/new" className="new">
                    <FiPlus color='#FFF' size={25}/>
                    Novo Chamado
                    </Link> 
                    <table> 
                        <thead>
                            <tr>
                                <th scope='col'>Cliente</th>
                                <th scope='col'>Assunto</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Cadastrando em</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td data-label="Cliente">Mercadinho</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                <span className="badge" style={{backgroundColor: '#999'}}>
                                    Em Aberto
                                </span>
                                </td>
                                <td data-label="Cadastrando">12/05/2022</td>
                                <td data-label="#">
                                    <button className='action' style = {{backgroundColor: '#3bb9ff'}}>  
                                        <FiSearch color="#FFF" size={17} />
                                    </button>
                                    <button className='action' style = {{backgroundColor: '#F6a935'}}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>


                                </td>  
                               
                            </tr>


                            <tr>
                                <td data-label="Cliente">Mercadinho</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                <span className="badge" style={{backgroundColor: '#999'}}>
                                    Em Aberto
                                </span>
                                </td>
                                <td data-label="Cadastrando">12/05/2022</td>
                                <td data-label="#">
                                    <button className='action' style = {{backgroundColor: '#3bb9ff'}}>  
                                        <FiSearch color="#FFF" size={17} />
                                    </button>
                                    <button className='action' style = {{backgroundColor: '#F6a935'}}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>

                                </td>  
                            
                            </tr>

                        </tbody>

                    </table>
                </>

            </div> 
           
        </div>
    )      
}