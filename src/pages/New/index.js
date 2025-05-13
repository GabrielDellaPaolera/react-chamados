import { useState,useEffect,useContext } from 'react';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs,getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

import './new.css';

const listRef = collection(db, 'costumers');

export default function New() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [costumers, setCostumers] = useState([]);
    const [loadCostumer,setLoadCostumer] = useState(true);
    const [costumerSelected, setCostumerSelected] = useState(0);    

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const [idCostumer, setIdCostumer] = useState(false);


    useEffect(() => {
        async function loadCostumers() {
            const querySnapshot = await getDocs(listRef)
            .then( (snapshot) => {
                
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia,
                    });
                });

                if (snapshot.docs.size === 0) {
                    console.log("Nenhum cliente encontrado!");
                    setCostumers([{id:1, nomeFantasia: 'Mercado Teste'}]);  
                    setLoadCostumer(false);
                    return;
                }

                setCostumers(lista);
                setLoadCostumer(false);

                if (id) {
                    loadId(lista);
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadCostumer(false);
                setCostumers([{id:1, nomeFantasia: 'Mercado Teste'}]);  
            });
    
        }
        loadCostumers();   
    }, [id]);

    async function loadId(lista) {
        const docRef = doc(db, 'chamados', id);
        await getDoc(docRef)
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setComplemento(snapshot.data().complemento);
            setStatus(snapshot.data().status);

            const index = lista.findIndex(item => item.id === snapshot.data().ClienteId);
            setCostumerSelected(index);
            setIdCostumer(true);

          })    
          .catch((error) => {
            console.log("Error getting document:", error);
            setIdCostumer(false);
          })
}



    function handleOptionChange(e) {
        setStatus(e.target.value);
    }


    function handleOptionSelect(e) {
        setStatus(e.target.value);
    }

    function handleChangeCostumer(e) {
        setCostumerSelected(e.target.value);
    }
    
    async function handleRegister(e) {
        e.preventDefault();

        if(idCostumer) {
            
            const docRef = doc(db, 'chamados', id);
            await updateDoc(docRef, {
                cliente: costumers[costumerSelected].nomeFantasia,
                ClienteId: costumers[costumerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid,
            })
            .then(() => {
                toast.info('Chamado editado com sucesso!');
                setComplemento('');
                setCostumerSelected(0);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao editar chamado, tente mais tarde!');
            });

            return;
        }

        await addDoc(collection(db, 'chamados'), {
            created:new Date(),
            cliente: costumers[costumerSelected].nomeFantasia,
            ClienteId: costumers[costumerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
        })
        .then(() => {
            toast.success('Chamado criado com sucesso!');
            setComplemento('');
            setCostumerSelected(0);
        })
        .catch((error) => {
            console.log(error);
            toast.error('Erro ao criar chamado, tente mais tarde!');
        });
    }

    return (
        <div> 
            <Header/>
        
        <div className="content"> 
            <Title name={id ? "Editando Chamado" : "Novo chamado"} >
            <FiPlusCircle size={25} color="#000" />
            </Title>

            <div className="container">
                <form className="form-profile" onSubmit={handleRegister}>
                    <label>Cliente</label>
                    {loadCostumer ? ( 
                        <input 
                        type="text" 
                        disabled={true} 
                        value="Carregando..." 
                        />
                    ) : (
                        <select value={costumerSelected} onChange={handleChangeCostumer}>
                            {costumers.map((item,index) => {
                                return (
                                    <option key={index} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                );
                            })}
                        </select>
                    )}

                    <label>Assunto</label>
                    <select valie ='{assunto}' onChange={handleOptionSelect}>  
                        <option value="Suporte"> Suporte</option>
                        <option value="Visita Tecnica"> Visita Tecnica</option>
                        <option value="Financeiro"> Financeiro</option>
                    </select>

                    <label>Status</label>
                    <div className="Status">
                        <input 
                        type="radio"
                        name="radio"
                        value="Aberto"
                        onChange ={handleOptionChange}
                        checked = {status === 'Aberto'}
                        />

                        <span>Em Aberto</span>

                        <input 
                        type="radio"
                        name="radio"
                        value="Progresso"
                        onChange ={handleOptionChange}
                        checked = {status === 'Progresso'}
                        />

                        <span>Em Progresso</span>

                        <input 
                        type="radio"
                        name="radio"
                        value="Atendido"
                        onChange ={handleOptionChange}
                        checked = {status === 'Atendido'}
                        />
                        <span>Atendido</span>
                    </div>

                    <label>Complemento</label>
                    <textarea
                    type= "text"
                    placeholder="Descreva seu problema (opcional)" 
                    value = {complemento}
                    onChange={ (e) => setComplemento(e.target.value)}
                    />

                    <button type="submit">Cadastrar</button> 

                </form>

                </div>
            </div>
        </div>

    )}