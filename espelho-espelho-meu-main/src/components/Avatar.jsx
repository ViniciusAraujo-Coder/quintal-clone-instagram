// Foto de perfil. Sem foto, mostra um círculo com a primeira letra do usuário
function Avatar({ user, cor, foto, tamanho = 36 }) {
  if (foto) {
    return (
      <img
        className="avatar"
        src={foto}
        alt=""
        style={{ width: tamanho, height: tamanho }}
      />
    )
  }

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
