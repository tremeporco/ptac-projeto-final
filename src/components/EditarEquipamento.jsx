import { useState } from 'react'
import { apiPut } from '../api'

function EditarEquipamento({ equipamento, onSalvar, onCancelar }) {
  const [nome, setNome] = useState(equipamento.title)
  const [preco, setPreco] = useState(equipamento.body)

async function enviar(e) {
  e.preventDefault()

  if (!nome.trim() || !preco.trim()) {
    alert('Preencha todos os campos.')
    return
  }

  try {
    const data = await apiPut(`/posts/${equipamento.id}`, {
      title: nome,
      body: preco,
    })
    onSalvar(data)
  } catch (e) {
    alert(e.message)
  }
}

  return (
    <form onSubmit={enviar}>
      <label>
        Nome
        <input value={nome} onChange={e => setNome(e.target.value)} />
      </label>
      <label>
        Preço
        <input value={preco} onChange={e => setPreco(e.target.value)} />
      </label>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  )
}

export default EditarEquipamento
