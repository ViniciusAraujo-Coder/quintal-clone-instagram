import { useState } from 'react'
import { FiHeart, FiHome, FiPlusSquare, FiSearch, FiUser } from 'react-icons/fi'
import Header from './components/Header'
import Stories from './components/Stories'
import Post from './components/Post'
import Aside from './components/Aside'
import posts from './data/posts.json'
import stories from './data/stories.json'
import usuarios from './data/usuarios.json'
import './App.css'

const EU = 'rafa.lima' // o usuário "logado"

function buscarUsuario(user) {
  return usuarios.find((usuario) => usuario.user === user)
}

function App() {
  const [seguindo, setSeguindo] = useState(['marinaecafe', 'patasdavila'])

  function alternarSeguir(user) {
    if (seguindo.includes(user)) {
      setSeguindo(seguindo.filter((u) => u !== user))
    } else {
      setSeguindo([...seguindo, user])
    }
  }

  return (
    <div className="app">
      <Header />

      <div className="layout">
        <main className="feed" aria-label="Feed de publicações">
          <Stories stories={stories} />
          {posts.map((post) => <Post key={post.id} post={post} />)}
        </main>

        <Aside
          eu={buscarUsuario(EU)}
          sugestoes={usuarios.filter((usuario) => usuario.user !== EU)}
          seguindo={seguindo}
          onSeguir={alternarSeguir}
        />
      </div>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        <button type="button" aria-label="Início"><FiHome /></button>
        <button type="button" aria-label="Pesquisar"><FiSearch /></button>
        <button type="button" aria-label="Criar publicação"><FiPlusSquare /></button>
        <button type="button" aria-label="Atividades"><FiHeart /></button>
        <button type="button" aria-label="Perfil"><FiUser /></button>
      </nav>
    </div>
  )
}

export default App
