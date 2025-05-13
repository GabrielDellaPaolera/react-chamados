import { useContext, useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'

import { db } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import axios from 'axios'

import { toast } from 'react-toastify'

import './profile.css';

export default function Profile() {

  const { user, storageUser, setUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user?.name ?? '')
  const [email] = useState(user && user.email)

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      }
      else {
        alert('Envie uma imagem do tipo PNG ou JPEG')
        setImageAvatar(null)
        return;
      }
    }
  }

  async function uploadToCloudinary(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'profile_upload'); // <-- Troque aqui
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dcf5zd837/image/upload', // troque pela URL correta
        formData
      );
      return response.data.secure_url;
    } catch (err) {
      console.error('Erro ao fazer upload no Cloudinary', err);
      return null;
    }
  }

  async function handleUpload() {
    if (imageAvatar) {
      const imageUrl = await uploadToCloudinary(imageAvatar);  // Usa o Cloudinary para o upload da imagem

      if (imageUrl) {
        const docRef = doc(db, 'users', user.uid)
        await updateDoc(docRef, {
          ...(nome ? { name: nome } : {}),
          avatarUrl: imageUrl
        })
        .then(() => {
          let data = {
            ...user,
            name: nome,
            avatarUrl: imageUrl
          }

          setUser(data)
          storageUser(data)
          toast.success('Perfil atualizado com sucesso!')
        })
      } else {
        toast.error('Falha ao fazer upload da imagem.')
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (nome.trim() === '') {
      alert('Preencha todos os campos');
      return;
    }

    if (imageAvatar === null && nome !== '') {
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, {
        name: nome,
        avatarUrl: user.avatarUrl ?? null
      })
        .then(() => {
          let data = {
            ...user,
            name: nome,
          }

          setUser(data)
          storageUser(data)
          toast.success('Perfil atualizado com sucesso!')
        })

    } else if (nome !== '' && imageAvatar !== null) {
      await handleUpload();
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">

          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} /> <br />
              {avatarUrl === null ? (
                <img src={avatar} alt="Foto de perfil" width={250} height={250} />
              ) : (
                <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
              )}

            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>

        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>Sair</button>
        </div>

      </div>

    </div>
  )
}
