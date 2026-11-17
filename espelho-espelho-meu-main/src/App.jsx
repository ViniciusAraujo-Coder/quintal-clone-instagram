import { useState } from 'react'
import {
  PiHandHeart,
  PiHandHeartFill,
  PiHouseSimple,
  PiHouseSimpleFill,
  PiPlusSquare,
  PiUser,
  PiUserFill,
} from 'react-icons/pi'
import Header from './components/Header'
import Stories from './components/Stories'
import Post from './components/Post'
import Perfil from './components/Perfil'
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
  const [filtro, setFiltro] = useState('todos') // 'todos' ou 'adocao'
  const [perfilAberto, setPerfilAberto] = useState(null) // null = mostra o feed
  const [seguindo, setSeguindo] = useState(['marinaecafe', 'patasdavila'])

  function alternarSeguir(user) {
    if (seguindo.includes(user)) {
      setSeguindo(seguindo.filter((u) => u !== user))
    } else {
      setSeguindo([...seguindo, user])
    }
  }

  function abrirPerfil(user) {
    if (!buscarUsuario(user)) return // nome que não existe nos dados: não faz nada
    setPerfilAberto(user)
    window.scrollTo(0, 0)
  }

  function irParaInicio(novoFiltro = 'todos') {
    setPerfilAberto(null)
    setFiltro(novoFiltro)
    window.scrollTo(0, 0)
  }

  const postsVisiveis = filtro === 'adocao' ? posts.filter((post) => post.adocao) : posts

  // Qual ícone da barra do celular fica aceso (valor derivado, sem estado novo)
  let abaAtiva = null
  if (perfilAberto === EU) abaAtiva = 'perfil'
  else if (!perfilAberto && filtro === 'adocao') abaAtiva = 'adocao'
  else if (!perfilAberto) abaAtiva = 'inicio'

  return (
    <div className="app">
      <Header onInicio={() => irParaInicio()} onPerfil={() => abrirPerfil(EU)} />

      <div className="layout">
        <main className="feed" aria-label="Feed de publicações">
          {perfilAberto ? (
            <Perfil
              usuario={buscarUsuario(perfilAberto)}
              posts={posts.filter((post) => post.user === perfilAberto)}
              ehVoce={perfilAberto === EU}
              seguindo={seguindo.includes(perfilAberto)}
              onSeguir={() => alternarSeguir(perfilAberto)}
              onVoltar={() => irParaInicio(filtro)}
            />
          ) : (
            <>
              <Stories stories={stories} />

              <div className="filtros">
                <button
                  className={`chip ${filtro === 'todos' ? 'ativo' : ''}`}
                  type="button"
                  onClick={() => setFiltro('todos')}
                >
                  Todos
                </button>
                <button
                  className={`chip ${filtro === 'adocao' ? 'ativo' : ''}`}
                  type="button"
                  onClick={() => setFiltro('adocao')}
                >
                  Para adoção
                </button>
              </div>

              {postsVisiveis.map((post) => (
                <Post key={post.id} post={post} eu={EU} onAbrirPerfil={abrirPerfil} />
              ))}
            </>
          )}
        </main>

        <Aside
          eu={buscarUsuario(EU)}
          sugestoes={usuarios.filter((usuario) => usuario.user !== EU)}
          seguindo={seguindo}
          onSeguir={alternarSeguir}
          onAbrirPerfil={abrirPerfil}
        />
      </div>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        <button
          className={`mobile-nav__item ${abaAtiva === 'inicio' ? 'ativo' : ''}`}
          type="button"
          aria-label="Início"
          onClick={() => irParaInicio()}
        >
          {abaAtiva === 'inicio' ? <PiHouseSimpleFill /> : <PiHouseSimple />}
        </button>
        <button
          className={`mobile-nav__item ${abaAtiva === 'adocao' ? 'ativo' : ''}`}
          type="button"
          aria-label="Adoção"
          onClick={() => irParaInicio('adocao')}
        >
          {abaAtiva === 'adocao' ? <PiHandHeartFill /> : <PiHandHeart />}
        </button>
        <button className="mobile-nav__item" type="button" aria-label="Criar publicação">
          <PiPlusSquare />
        </button>
        <button
          className={`mobile-nav__item ${abaAtiva === 'perfil' ? 'ativo' : ''}`}
          type="button"
          aria-label="Perfil"
          onClick={() => abrirPerfil(EU)}
        >
          {abaAtiva === 'perfil' ? <PiUserFill /> : <PiUser />}
        </button>
      </nav>
    </div>
  )
}

export default App
