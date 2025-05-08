import { useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';

import {FiUser} from 'react-icons/fi';
import { toast} from 'react-toastify';

import {db} from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';


export default function Costumers(){

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');


    
async function HandleRegister(e){
    e.preventDefault();

    if(nome !== '' && cnpj !== '' && endereco !== ''){
       await addDoc(collection(db, 'costumers'), {
            nomeFantasia: nome,
            cnpj: cnpj,
            endereco: endereco
        })
        .then(() => {
            setNome('')
            setCnpj('')
            setEndereco('')
            toast.success('Cliente cadastrado com sucesso!')
        })
        .catch((error) => {
            console.log(error)
            toast.error('Erro ao cadastrar cliente, tente mais tarde!')
        })
    }else{
        toast.error('Preencha todos os campos!')
    }
}
    return(
        <div>
        <Header/>

        <div className="content">
            <Title name="Clientes">
                <FiUser size={25} />
            </Title>

            <div className="container">
                <form className="form-profile" onSubmit={HandleRegister}>
                    <label>Nome do cliente</label>
                    <input type="text" 
                    placeholder="Nome da empresa" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    />        

                    <label>CNPJ</label>
                    <input type="text" 
                    placeholder="Digite o CNPJ" 
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    />    

                    <label>Endereço </label>
                    <input type="text" 
                    placeholder="Endereço da empresa" 
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    />          

                    <button type="submit">Salvar</button>

                </form>
            </div>
            
        </div>
    </div>
    )
}