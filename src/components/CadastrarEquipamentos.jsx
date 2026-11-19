
import { useState } from 'react'

function CadastrarEquipamentos() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(null)
  const [criado, setCriado] = useState(null)  // recurso recém-criado

  async function enviar(e) {
    e.preventDefault()  // impede o reload da página
    setEnviando(true)
    setErro(null)
    setCriado(null)

    if (!nome.trim() || !preco.trim()) {
      setErro('Preencha todos os campos.')
      setEnviando(false)
      return
    }

    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: nome, body: preco }),
      })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const data = await resp.json()
      setCriado(data)        // mostra o recurso criado
      setNome('')            // limpa o formulario
      setPreco('')
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar}>
      <h2>Novo equipamento</h2>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do equipamento"
      />
      <input
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        placeholder="Preço da diária"
      />
      <button disabled={enviando}>Cadastrar</button>
      {enviando && <p>Enviando...</p>}
      {erro && <p>Erro: {erro}</p>}
      {criado && <p> Criado com id={criado.id} e nome={criado.title}.</p>}
    </form>
  )
}

export default CadastrarEquipamentos
