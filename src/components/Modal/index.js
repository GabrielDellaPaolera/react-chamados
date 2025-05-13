import './modal.css';
import { FiX } from 'react-icons/fi';

export default function Modal() {  
    return (
        <div className  = "modal">
            <div className = "container">
                <button className = "close">
                    <FiX size={25} color="#000" />
                    Voltar
                </button> 

                <main>
                    <h2> Detalhes do chamado </h2>
                <div className = "row">
                    <span>
                        Cliente: <i>Nome do cliente</i>
                    </span>
                </div>

                <div className = "row">
                <span>
                Assunto: <i>Suporte</i>
                </span>
                <span>
                    Cadastrado em: <i>01/01/2023</i>    
                </span>
                </div>

                <div className = "row">
                    <span>
                        Status: <i>Em andamento</i>
                    </span>
                </div>    

                <> 
                <h3>Complemento</h3>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas 
                    congue ligula ac quam viverra nec consectetur ante 
                    hendrerit. Donec et mollis dolor. Praesent et diam eget 
                    libero egestas faucibus. Donec et mollis dolor. Praesent 
                    et diam eget libero egestas faucibus. Donec et mollis 
                    dolor. Praesent et diam eget libero egestas faucibus.
                </p>
                </>

                </main>

           </div>
        </div>
    )
}
