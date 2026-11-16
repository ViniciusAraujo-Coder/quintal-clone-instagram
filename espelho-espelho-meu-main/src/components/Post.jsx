import { useState } from 'react'
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiSend
} from 'react-icons/fi'

function Post({ post }) {
  // Aula 1: curtir e salvar
  const [curtido, setCurtido] = useState(false)
  const [salvo, setSalvo] = useState(false)

  // Aula 2: comentários
  const [comentarios, setComentarios] = useState(post.comentarios)
  const [texto, setTexto] = useState('')

  // Não precisa de outro estado: dá para calcular a partir do "curtido"
  const curtidas = post.likes + (curtido ? 1 : 0)

  function enviarComentario(evento) {
    evento.preventDefault()
    if (texto.trim() === '') return
    setComentarios([...comentarios, { id: Date.now(), user: 'você', texto }])
    setTexto('')
  }

  return (
    <article className="post">
      <header className="post__header">
        <img
          className="post__avatar"
          src={post.avatar}
          alt={`Foto de ${post.user}`}
        />

        <div className="post__user">
          <strong>{post.user}</strong>
          <span>{post.location}</span>
        </div>

        <button
          className="icon-button post__more"
          type="button"
          aria-label="Mais opções"
        >
          <FiMoreHorizontal />
        </button>
      </header>

      {/* Duplo clique na foto curte, igual no Instagram */}
      <img
        className="post__image"
        src={post.image}
        alt={post.alt}
        onDoubleClick={() => setCurtido(true)}
      />

      <div className="post__content">
        <div className="post__actions">
          <button
            className={`icon-button ${curtido ? 'curtido' : ''}`}
            type="button"
            aria-label="Curtir"
            onClick={() => setCurtido(!curtido)}
          >
            <FiHeart />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="Comentar"
          >
            <FiMessageCircle />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="Compartilhar"
          >
            <FiSend />
          </button>

          <button
            className={`icon-button ${salvo ? 'salvo' : ''}`}
            type="button"
            aria-label="Salvar"
            onClick={() => setSalvo(!salvo)}
          >
            <FiBookmark />
          </button>
        </div>

        <p className="post__likes">
          <strong>{curtidas} curtidas</strong>
        </p>

        <p className="post__caption">
          <strong>{post.user}</strong> {post.caption}
        </p>

        <ul className="comentarios">
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <strong>{comentario.user}</strong> {comentario.texto}
            </li>
          ))}
        </ul>
      </div>

      <form className="comentar" onSubmit={enviarComentario}>
        <input
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="Adicione um comentário..."
          aria-label="Escrever comentário"
        />
        <button type="submit" disabled={texto.trim() === ''}>
          Publicar
        </button>
      </form>
    </article>
  )
}

export default Post
