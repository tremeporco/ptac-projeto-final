
function ListaEquipamentos({ equipamentos, onEditar, onExcluir }) {
  return (
    <ul>
      {equipamentos.map(e => (
        <li key={e.id}>
          {e.title} - {e.body}

          <button onClick={() => onEditar(e)}>
            Editar
          </button>

          <button onClick={() => onExcluir(e.id)}>
            Excluir
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ListaEquipamentos
