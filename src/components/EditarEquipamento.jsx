import { useState } from 'react'

function EditarEquipamento({ equipamento, onSalvar, onCancelar }) {
  const [nome, setNome] = useState(equipamento.title)
  const [preco, setPreco] = useState(equipamento.body)

  async function enviar(e) {
    e.preventDefault()

    try {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${equipamento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: nome, body: preco }),
      })

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

      const data = await resp.json()
      onSalvar(data)
    } catch (e) {
      alert(e.message)
    }
  }

    return (
    <>
      <CadastrarEquipamentos onCriado={adicionarEquipamento} />

      {editando && (
        <EditarEquipamento
          equipamento={editando}
          onSalvar={salvarEdicao}
          onCancelar={() => setEditando(null)}
        />
      )}

      <ListaEquipamentos
        equipamentos={equipamentos}
        onEditar={editarEquipamento}
        onExcluir={excluirEquipamento}
      />
    </>
  )
}
  // Atualiza o equipamento na lista usando map
  function salvarEdicao(equipamentoAtualizado) {
    setEquipamentos(prev => prev.map(e =>
      e.id === equipamentoAtualizado.id ? equipamentoAtualizado : e
    ))

    setEditando(null)
  }


export default EditarEquipamento
