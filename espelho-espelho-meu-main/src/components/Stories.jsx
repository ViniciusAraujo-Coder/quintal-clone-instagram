import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import Avatar from './Avatar'

function Stories({ stories }) {
  // Guarda qual story está aberto (null = nenhum)
  const [aberto, setAberto] = useState(null)

  return (
    <>
      <section className="stories" aria-label="Stories">
        {stories.map((story) => (
          <button key={story.id} className="story" type="button" onClick={() => setAberto(story)}>
            <span className="story__anel">
              <Avatar user={story.user} cor={story.cor} tamanho={58} />
            </span>
            <span className="story__nome">{story.user}</span>
          </button>
        ))}
      </section>

      {aberto && (
        <div className="modal-fundo" onClick={() => setAberto(null)}>
          <div className="story-aberto" style={{ background: aberto.cor }}>
            <header>
              <Avatar user={aberto.user} cor="rgb(0 0 0 / .25)" tamanho={32} />
              <strong>{aberto.user}</strong>
              <button className="icon-button" type="button" aria-label="Fechar">
                <FiX />
              </button>
            </header>
            <p>{aberto.texto}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Stories
