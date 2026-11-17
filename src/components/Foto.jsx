import { PiBird, PiCat, PiDog } from 'react-icons/pi'

// Um ícone para cada espécie (usado quando o post não tem foto)
const ICONES = { cachorro: PiDog, gato: PiCat, ave: PiBird }

// Mostra a imagem do post. Sem imagem, mostra um fundo colorido com o ícone do animal.
function Foto({ post }) {
  if (post.image) {
    return <img className="foto" src={post.image} alt={post.alt} />
  }

  const Icone = ICONES[post.especie] || PiDog
  return (
    <div className={`foto foto--vazia tom-${post.tom}`} role="img" aria-label={post.alt}>
      <Icone />
    </div>
  )
}

export default Foto
