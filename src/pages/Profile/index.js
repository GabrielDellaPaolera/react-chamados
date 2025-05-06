import { useContext, useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'

export default function Profile() {

    const { user } = useContext(AuthContext);
    const {avatarUrl, setAvatarUrl} = useState(user.avatarUrl && user.avatarUrl);

return(
    <div> 
        <Header/>
        <div className = "content"> 
        <Title name = "Minha conta">

        <FiSettings size={25} />
        
        </Title> 

        <div className="container">

        <form className = 'form-profile'> 
        <label className="laber-avatar">

        <span>
            <FiUpload color="#fff" size={25} />
        </span>

        <input type='file' accpt='image/*'/> <br/>

        {avatarUrl === null ? (
            <img src={avatar} alt="Foto de perfil" width={250} height = {250} />
        ) : (

            <img src={avatar} alt="Foto de perfil" width={250} height = {250} />
        )}
        </label>

        <label> Nome </label>
        <input type='text' placeholder='Seu nome'/>
        
        <label> Nome </label>
        <input type='text' placeholder='seuemail@mail.com' disabled={true}/>
            
        <button type = "submit"> Salvar  </button>
        </form> 
    
    </div>

    <div className= "conteiner"> 
        <button className="logout"> Sair </button>
    </div>
    
    
    </div>
    </div>
    
)
}
