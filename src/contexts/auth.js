import { useState,createContext, useEffect } from "react";
import { auth, db } from "../Services/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({children}) { 
    
    const [user,setUser] = useState(null);
    const [loadingAuth,setLoadingAuth] = useState(false); // Para controlar o loading do app
    const [loading,setLoading] = useState(true); // Para controlar o loading do app

    const navigate = useNavigate();

    useEffect(() => { 
        async function loadUser() {
            const storageUser = localStorage.getItem('@ticketsPRO'); // Pega o usuário do localStorage
            if(storageUser) { // Se o usuário existir no localStorage
                setUser(JSON.parse(storageUser)); // Armazena o usuário no estado
                setLoading(false); // Finaliza o loading do app
            } 
                setLoading(false); // Finaliza o loading do app
        }
      
        loadUser(); // Chama a função para carregar o usuário
    },[])


    async function signIn(email,password) {
    setLoadingAuth(true); // Inicia o loading de autenticação

    await signInWithEmailAndPassword(auth,email,password)  
    .then(async (value) => {
        let uid = value.user.uid; // Pega o id do usuário
        const docRef = doc(db,"users",uid); // Pega o documento do usuário no banco de dados
        const docSnap = await getDoc(docRef); // Pega os dados do usuário no banco de dados
      
            let data = {
                uid:uid,
                name:docSnap.data().nome,
                email:value.user.email,
                avatarUrl:docSnap.data().avatarUrl
            }

            setUser(data); // Armazena os dados do usuário no estado
            storageUser(data); // Armazena os dados do usuário no localStorage
            setLoadingAuth(false); // Finaliza o loading de autenticação
            toast.success('Bem-vindo de volta!') // Exibe mensagem de sucesso
            navigate('/dashboard'); // Redireciona para o dashboard
        })

    .catch((error) => {
        console.log(error); // Exibe o erro no console
        setLoadingAuth(false); // Finaliza o loading de autenticação
        toast.error('Ops, algo deu errado!') // Exibe mensagem de erro
    })

}
async function signUp(email,password,name) {

  setLoadingAuth(true); // Inicia o loading de autenticação

  await createUserWithEmailAndPassword(auth,email,password)
    .then(async (value) => {
        let uid = value.user.uid; // Pega o id do usuário
        await setDoc(doc(db,"users",uid),{
            nome:name,
            avatarUrl:null,
            email:email,
        })
        .then(() => {
           
            let data = {
                uid:uid,
                name:name,
                email:email,
                avatarUrl:null
            }

            setUser(data);
            storageUser(data) 
            setLoadingAuth(false);
            toast.success('Cadastro realizado com sucesso!') // Exibe mensagem de sucesso
            navigate('/dashboard'); // Redireciona para o dashboard

        })
    })
    .catch((error) => {
        console.log(error);
        setLoadingAuth(false); // Finaliza o loading de autenticação
    })
}

function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data)); // Armazena o usuário no localStorage

}

async function logout() {
    await signOut(auth); // Faz o logout do usuário
    localStorage.removeItem('@ticketsPRO'); // Remove o usuário do localStorage
    setUser(null); // Limpa o estado do usuário
    toast.info('Deslogado com sucesso!') // Exibe mensagem de sucesso
    navigate('/'); // Redireciona para a página de login
}

    return(
        <AuthContext.Provider 
        value={{
            signed:!!user, //false se não tiver um usuário
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading
    
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;