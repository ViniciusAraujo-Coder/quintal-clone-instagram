import { PiHeart, PiPaperPlaneTilt, PiPlusSquare, PiUser } from 'react-icons/pi'

function Header({ onInicio, onPerfil }) {
  return (
    <header className="header">
      <button className="logo" type="button" onClick={onInicio}>quintal</button>
      <nav className="header__actions" aria-label="Navegação principal">
        <button className="icon-button" type="button" aria-label="Criar publicação">
          <PiPlusSquare />
        </button>
        <button className="icon-button" type="button" aria-label="Notificações">
          <PiHeart />
        </button>
        <button className="icon-button" type="button" aria-label="Mensagens">
          <PiPaperPlaneTilt />
        </button>
        <button className="icon-button" type="button" aria-label="Meu perfil" onClick={onPerfil}>
          <PiUser />
        </button>
      </nav>
    </header>
  )
}

export default Header
