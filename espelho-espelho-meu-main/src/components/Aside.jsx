import Avatar from './Avatar'

// Coluna da direita: sua conta e sugestões de quem seguir
function Aside({ eu, sugestoes, seguindo, onSeguir }) {
  return (
    <aside className="aside">
      <div className="aside__pessoa">
        <Avatar user={eu.user} cor={eu.cor} tamanho={48} />
        <span>
          <strong>{eu.user}</strong>
          <small>{eu.nome}</small>
        </span>
      </div>

      <h2 className="aside__titulo">Sugestões para você</h2>

      <ul className="aside__lista">
        {sugestoes.map((usuario) => {
          const jaSegue = seguindo.includes(usuario.user)

          return (
            <li key={usuario.user}>
              <div className="aside__pessoa">
                <Avatar user={usuario.user} cor={usuario.cor} />
                <span>
                  <strong>{usuario.user}</strong>
                  <small>{usuario.bairro}</small>
                </span>
              </div>
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

      <p className="aside__rodape">Projeto de estudo em React</p>
    </aside>
  )
}

export default Aside
