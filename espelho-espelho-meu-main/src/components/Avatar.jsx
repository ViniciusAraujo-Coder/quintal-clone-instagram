// Círculo com a primeira letra do usuário (enquanto não temos fotos)
function Avatar({ user, cor, tamanho = 36 }) {
  return (
    <span
      className="avatar"
      style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.42, background: cor }}
    >
      {user[0].toUpperCase()}
    </span>
  )
}

export default Avatar
