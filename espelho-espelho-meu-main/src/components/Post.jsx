import { useState } from 'react'
import {
  PiBookmarkSimple,
  PiBookmarkSimpleFill,
  PiChatCircle,
  PiDotsThreeBold,
  PiHeart,
  PiHeartFill,
  PiPaperPlaneTilt,
} from 'react-icons/pi'
import Avatar from './Avatar'
import Foto from './Foto'

function Post({ post, eu, onAbrirPerfil }) {
  // Aula 1: curtir e salvar
  const [curtido, setCurtido] = useState(false)
  const [salvo, setSalvo] = useState(false)

  // Aula 2: comentários
  const [comentarios, setComentarios] = useState(post.comentarios)
  const [texto, setTexto] = useState('')

  // Aula 5: pedido de adoção
  const [pedidoEnviado, setPedidoEnviado] = useState(false)

  // Não precisa de outro estado: dá para calcular a partir do "curtido"
  const curtidas = post.likes + (curtido ? 1 : 0)

  function enviarComentario(evento) {
    evento.preventDefault()
    if (texto.trim() === '') return
    // O comentário novo sai com o seu usuário, então o nome também abre o seu perfil
    setComentarios([...comentarios, { id: Date.now(), user: eu, texto }])
    setTexto('')
  }

  return (
    <article className="post">
      <header className="post__header">
        <button className="post__autor" type="button" onClick={() => onAbrirPerfil(post.user)}>
          <Avatar user={post.user} cor={post.cor} foto={post.foto} />
          <span className="post__user">
            <strong>{post.user}</strong>
            <span>{post.bairro}</span>
          </span>
        </button>

        <button
          className="icon-button post__more"
          type="button"
          aria-label="Mais opções"
        >
          <PiDotsThreeBold />
        </button>
      </header>

      {/* Duplo clique na foto curte, igual no Instagram */}
      <div className="post__foto" onDoubleClick={() => setCurtido(true)}>
        <Foto post={post} />
        {post.adocao && <span className="selo">Para adoção</span>}
      </div>

      <div className="post__content">
        <div className="post__actions">
          <button
            className={`icon-button ${curtido ? 'curtido' : ''}`}
            type="button"
            aria-label="Curtir"
            onClick={() => setCurtido(!curtido)}
          >
            {curtido ? <PiHeartFill /> : <PiHeart />}
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="Comentar"
          >
            <PiChatCircle />
          </button>

          <button
            className="icon-button"
            type="button"
            aria-label="Compartilhar"
          >
            <PiPaperPlaneTilt />
          </button>

          <button
            className={`icon-button ${salvo ? 'salvo' : ''}`}
            type="button"
            aria-label="Salvar"
            onClick={() => setSalvo(!salvo)}
          >
            {salvo ? <PiBookmarkSimpleFill /> : <PiBookmarkSimple />}
          </button>
        </div>

        <p className="post__likes">
          <strong>{curtidas.toLocaleString('pt-BR')} curtidas</strong>
        </p>

        <p className="post__caption">
          <button className="nome-link" type="button" onClick={() => onAbrirPerfil(post.user)}>
            {post.user}
          </button>{' '}
          {post.caption}
        </p>

        {post.adocao && (
          <div className="adocao">
            <div>
              <strong>{post.adocao.nome}</strong>
              <span>{post.adocao.info}</span>
            </div>
            <button
              className="botao"
              type="button"
              disabled={pedidoEnviado}
              onClick={() => setPedidoEnviado(true)}
            >
              {pedidoEnviado ? 'Pedido enviado ✓' : 'Quero adotar'}
            </button>
          </div>
        )}

        <ul className="comentarios">
          {comentarios.map((comentario) => (
            <li key={comentario.id}>
              <button className="nome-link" type="button" onClick={() => onAbrirPerfil(comentario.user)}>
                {comentario.user}
              </button>{' '}
              {comentario.texto}
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
