import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiMessageSquare,FiPlus, FiSearch , FiEdit2 } from "react-icons/fi";
import { db } from "../../services/firebaseConnection"; // Importando a conexão com o Firebase  
import { Link } from "react-router-dom";

import { collection,getDocs,orderBy,limit,startAfter,query } from 'firebase/firestore'; // Importando as funções do Firebase Firestore

import'./dashboard.css'; // Importando o CSS do Dashboard

const listRef = collection(db,'chamados'); // Referência para a coleção 'chamados' no Firestore

export default function Dashboard(){
const {logout} = useContext(AuthContext); // Pegando a função de logout do contexto de autenticação

const [chamados,setChamados] = useState([]); // Estado para armazenar os chamados
const [loading,setLoading] = useState(true); // Estado para controlar o carregamento
const [isEmpty,setIsEmpty] = useState(false); // Estado para verificar se a lista de chamados está vazia

    useEffect(() => {
        async function loadChamados(){  
            const q = query(listRef,orderBy('created','desc'),limit(5)); // Criando a consulta para pegar os chamados ordenados pela data de criação em ordem decrescente e limitando a 5 resultados

            const querySnapshot = await getDocs(q); // Executando a consulta e pegando os resultados
            await updateState(querySnapshot); // Atualizando o estado com os resultados

            setLoading(false);
        }

        loadChamados(); // Chamando a função para carregar os chamados

        return () => {  }

    },[]); 

    async function updateState(querySnapshot){

        const isCollectionEmpty = querySnapshot.size === 0; // Verificando se a consulta retornou resultados
       
        if(!isCollectionEmpty){
            const lista = []; // Criando uma lista para armazenar os chamados

            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    status: doc.data().status,
                    complemento: doc.data().complemento,  
                });
            });

            setChamados(chamados => [...chamados,...lista]); // Atualizando o estado com os chamados
        }else {
            setIsEmpty(true); // Se a consulta não retornou resultados, atualiza o estado para indicar que a lista está vazia

        }
    
    
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

                    {chamados.length === 0 ? (
                        <div className="dashboard">
                            <span>Você ainda não possui chamados cadastrados</span>
                            <Link to="/new" className="new">
                            <FiPlus color='#FFF' size={25}/>
                            Novo Chamado
                            </Link>
                        </div>
                    ) : (
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



                        </tbody>

                    </table>

                       </>
                    )}


                </>

            </div> 
           
        </div>
    )      
}