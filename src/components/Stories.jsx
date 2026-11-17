import { useState } from 'react'
import { PiX } from 'react-icons/pi'
import Avatar from './Avatar'

// Junta os stories da mesma pessoa num "grupo", na ordem em que aparecem.
// Assim cada pessoa tem uma bolinha só, igual no Instagram.
function agruparPorUsuario(stories) {
  const grupos = []

  for (const story of stories) {
    const grupo = grupos.find((g) => g.user === story.user)
    if (grupo) {
      grupo.itens.push(story)
    } else {
      grupos.push({ user: story.user, cor: story.cor, foto: story.foto, itens: [story] })
    }
  }

  return grupos
}

function Stories({ stories }) {
  const grupos = agruparPorUsuario(stories)

  // Qual pessoa (grupo) e qual story dela estão abertos. null = nenhum
  const [aberto, setAberto] = useState(null) // ex.: { grupo: 0, item: 1 }

  // Valores derivados: dá para calcular a partir do "aberto"
  const grupoAtual = aberto && grupos[aberto.grupo]
  const storyAtual = grupoAtual && grupoAtual.itens[aberto.item]

  function proximo() {
    if (aberto.item < grupoAtual.itens.length - 1) {
      // ainda tem story dessa pessoa
      setAberto({ grupo: aberto.grupo, item: aberto.item + 1 })
    } else if (aberto.grupo < grupos.length - 1) {
      // acabou essa pessoa: vai para a próxima
      setAberto({ grupo: aberto.grupo + 1, item: 0 })
    } else {
      // acabaram todos: fecha
      setAberto(null)
    }
  }

  function anterior() {
    if (aberto.item > 0) {
      setAberto({ grupo: aberto.grupo, item: aberto.item - 1 })
    } else if (aberto.grupo > 0) {
      // volta para o último story da pessoa anterior
      const grupoAnterior = aberto.grupo - 1
      setAberto({ grupo: grupoAnterior, item: grupos[grupoAnterior].itens.length - 1 })
    }
  }

  return (
    <>
      <section className="stories" aria-label="Stories">
        {grupos.map((grupo, indice) => (
          <button
            key={grupo.user}
            className="story"
            type="button"
            onClick={() => setAberto({ grupo: indice, item: 0 })}
          >
            <span className="story__anel">
              <Avatar user={grupo.user} cor={grupo.cor} foto={grupo.foto} tamanho={58} />
            </span>
            <span className="story__nome">{grupo.user}</span>
          </button>
        ))}
      </section>

      {aberto && (
        <div className="modal-fundo" onClick={() => setAberto(null)}>
          <div
            className={`story-aberto ${storyAtual.image ? 'story-aberto--foto' : ''}`}
            style={
              storyAtual.image
                ? { backgroundImage: `linear-gradient(rgb(0 0 0 / .4), transparent 25%, transparent 50%, rgb(0 0 0 / .7)), url(${storyAtual.image})` }
                : { background: storyAtual.cor }
            }
            // Clicar DENTRO do story não pode fechar (o clique "subiria" até o fundo)
            onClick={(evento) => evento.stopPropagation()}
          >
            {/* Uma barrinha por story da pessoa */}
            <div className="story__barras">
              {grupoAtual.itens.map((item, i) => (
                <span key={item.id} className="story__barra">
                  <span
                    // A key muda a cada story: o React recria a barra e a animação recomeça
                    key={`${aberto.grupo}-${aberto.item}`}
                    className={`story__progresso ${i < aberto.item ? 'cheio' : ''} ${i === aberto.item ? 'rodando' : ''}`}
                    // Quando a animação de 5s termina, passa para o próximo
                    onAnimationEnd={i === aberto.item ? proximo : undefined}
                  />
                </span>
              ))}
            </div>

            <header>
              <Avatar user={grupoAtual.user} cor="rgb(0 0 0 / .25)" foto={grupoAtual.foto} tamanho={32} />
              <strong>{grupoAtual.user}</strong>
              <button
                className="icon-button"
                type="button"
                aria-label="Fechar"
                onClick={() => setAberto(null)}
              >
                <PiX />
              </button>
            </header>

            <p>{storyAtual.texto}</p>

            {/* Áreas invisíveis: toque na esquerda volta, na direita avança */}
            <button className="story__lado story__lado--voltar" type="button" aria-label="Story anterior" onClick={anterior} />
            <button className="story__lado story__lado--avancar" type="button" aria-label="Próximo story" onClick={proximo} />
          </div>
        </div>
      )}
    </>
  )
}

export default Stories
