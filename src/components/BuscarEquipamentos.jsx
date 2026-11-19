
import { useEffect, useState } from 'react'
import CadastrarEquipamentos from './CadastrarEquipamentos'
import ListaEquipamentos from './ListaEquipamentos'

export default function BuscarEquipamentos() {
  const [equipamentos, setEquipamentos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()  // cria um controle
    const signal = controle.signal          // o signal vigia a requisição

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts', { signal })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        setEquipamentos(data)
      } catch (e) {
        if (e.name !== 'AbortError') {
          // Ignora AbortError: é quando nós mesmos cancelamos
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    // Cleanup: ao desmontar, cancela a requisição em andamento
    return () => controle.abort()
  }, [])

  // Adiciona o equipamento criado à lista sem fazer outro GET
  function adicionarEquipamento(novoEquipamento) {
    setEquipamentos(prev => [...prev, novoEquipamento])
  }

  // Exclui o equipamento pelo id
  async function excluirEquipamento(id) {
    try {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

      // Remove o equipamento da lista usando filter
      setEquipamentos(prev => prev.filter(e => e.id !== id))
    } catch (e) {
      setErro(e.message)
    }
  }

  // Prepara o equipamento para edição
  function editarEquipamento(equipamento) {
    console.log('Editar equipamento:', equipamento)
  }

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>
  if (equipamentos.length === 0) return <p>Nenhum equipamento encontrado.</p>

  return (
    <>
      <CadastrarEquipamentos onCriado={adicionarEquipamento} />

      <ListaEquipamentos
        equipamentos={equipamentos}
        onEditar={editarEquipamento}
        onExcluir={excluirEquipamento}
      />
    </>
  )
}
