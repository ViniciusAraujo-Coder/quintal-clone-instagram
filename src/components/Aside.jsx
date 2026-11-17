import Avatar from './Avatar'

// Coluna da direita: sua conta e sugestões de quem seguir
function Aside({ eu, sugestoes, seguindo, onSeguir, onAbrirPerfil }) {
  return (
    <aside className="aside">
      <button className="aside__pessoa" type="button" onClick={() => onAbrirPerfil(eu.user)}>
        <Avatar user={eu.user} cor={eu.cor} foto={eu.foto} tamanho={48} />
        <span>
          <strong>{eu.user}</strong>
          <small>{eu.nome}</small>
        </span>
      </button>

      <h2 className="aside__titulo">Sugestões para você</h2>

      <ul className="aside__lista">
        {sugestoes.map((usuario) => {
          const jaSegue = seguindo.includes(usuario.user)

          return (
            <li key={usuario.user}>
              <button className="aside__pessoa" type="button" onClick={() => onAbrirPerfil(usuario.user)}>
                <Avatar user={usuario.user} cor={usuario.cor} foto={usuario.foto} />
                <span>
                  <strong>{usuario.user}</strong>
                  <small>{usuario.bairro}</small>
                </span>
              </button>
              <button
                className={`aside__seguir ${jaSegue ? 'seguindo' : ''}`}
                type="button"
                onClick={() => onSeguir(usuario.user)}
              >
                {jaSegue ? 'Seguindo' : 'Seguir'}
              </button>
            </li>
          )
        })}
      </ul>

      <p className="aside__rodape">quintal · projeto de estudo em React</p>
    </aside>
  )
}

export default Aside
