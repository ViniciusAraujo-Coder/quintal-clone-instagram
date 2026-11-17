import { PiArrowLeft, PiHeartFill, PiMapPin, PiPawPrint } from 'react-icons/pi'
import Avatar from './Avatar'
import Foto from './Foto'

function Perfil({ usuario, posts, ehVoce, seguindo, onSeguir, onVoltar }) {
  return (
    <section className="perfil">
      <button className="voltar" type="button" onClick={onVoltar}>
        <PiArrowLeft /> Voltar
      </button>

      <header className="perfil__topo">
        <Avatar user={usuario.user} cor={usuario.cor} foto={usuario.foto} tamanho={86} />
        <div className="perfil__numeros">
          <span><strong>{posts.length}</strong> posts</span>
          <span><strong>{usuario.seguidores.toLocaleString('pt-BR')}</strong> seguidores</span>
          <span><strong>{usuario.seguindo.toLocaleString('pt-BR')}</strong> seguindo</span>
        </div>
      </header>

      <div className="perfil__bio">
        <strong>{usuario.nome}</strong>
        <span className="perfil__user">@{usuario.user}</span>
        <p>{usuario.bio}</p>
        <span className="perfil__local"><PiMapPin /> {usuario.bairro}</span>
      </div>

      {usuario.pets.length > 0 && (
        <div className="perfil__pets">
          {usuario.pets.map((pet) => (
            <span key={pet} className="pet"><PiPawPrint /> {pet}</span>
          ))}
        </div>
      )}

      {ehVoce ? (
        <button className="botao botao--claro botao--largo" type="button">Editar perfil</button>
      ) : (
        <button
          className={`botao botao--largo ${seguindo ? 'botao--claro' : ''}`}
          type="button"
          onClick={onSeguir}
        >
          {seguindo ? 'Seguindo' : 'Seguir'}
        </button>
      )}

      {posts.length > 0 ? (
        <div className="grade">
          {posts.map((post) => (
            <div key={post.id} className="grade__item">
              <Foto post={post} />
              <span className="grade__curtidas"><PiHeartFill /> {post.likes}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="perfil__vazio">Nenhuma publicação ainda.</p>
      )}
    </section>
  )
}

export default Perfil
