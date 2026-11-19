
import { useState } from 'react'
import { apiPost } from '../api'
import { validarEquipamento } from '../utils/validarEquipamento'
function CadastrarEquipamentos({ onCriado }) {
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
      validarEquipamento(nome, preco)
  const data = await apiPost('/posts', {
  title: nome,
  body: preco,
  
})
      onCriado(data) 
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
