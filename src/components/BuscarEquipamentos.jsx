
import { useEffect, useState } from 'react'
import CadastrarEquipamentos from './CadastrarEquipamentos'
import ListaEquipamentos from './ListaEquipamentos'
import EditarEquipamento from './EditarEquipamento'
import { apiGet, apiDelete } from '../api' 
import { filtrarEquipamentos } from '../utils/filtrarEquipamentos'

export default function BuscarEquipamentos() {
  const [equipamentos, setEquipamentos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
const [editando, setEditando] = useState(null)  
const [busca, setBusca] = useState('')
const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const controle = new AbortController()  // cria um controle
    const signal = controle.signal          // o signal vigia a requisição

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
const data = await apiGet('/posts', { signal })
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
 await apiDelete(`/posts/${id}`)

      // Remove o equipamento da lista usando filter
      setEquipamentos(prev => prev.filter(e => e.id !== id))
    } catch (e) {
      setErro(e.message)
    }
  }

  // Prepara o equipamento para edição
 function editarEquipamento(equipamento) {
  setEditando(equipamento)
}

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>

const equipamentosFiltrados = filtrarEquipamentos(equipamentos, filtro)
 return (
  <>
    <CadastrarEquipamentos onCriado={adicionarEquipamento} />

<div>
  <input
    type="text"
    placeholder="Buscar equipamento pelo nome"
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
  />

  <button onClick={() => setFiltro(busca)}>
    Buscar
  </button>

  <button onClick={() => {
    setBusca('')
    setFiltro('')
  }}>
    Limpar
  </button>
</div>

    {editando && (
      <EditarEquipamento
        equipamento={editando}
        onSalvar={(equipamentoAtualizado) => {
          // Atualiza o equipamento na lista usando map
          setEquipamentos(prev => prev.map(e =>
            e.id === equipamentoAtualizado.id ? equipamentoAtualizado : e
          ))
          setEditando(null)
        }}
        onCancelar={() => setEditando(null)}
      />
    )}

{equipamentosFiltrados.length === 0 ? (
  <p>Nenhum equipamento encontrado.</p>
) : (
  <ListaEquipamentos
    equipamentos={equipamentosFiltrados}
    onEditar={editarEquipamento}
    onExcluir={excluirEquipamento}
  />
)}
  </>
)
}

