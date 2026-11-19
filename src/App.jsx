
import { useEffect, useState } from 'react'

function App() {
  const [equipamentos, setEquipamentos] = useState([])

  useEffect(() => {
    // Roda quando o componente é montado
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setEquipamentos(data))
  }, [])

  return (
    <main>
      <h1>Catálogo de Produtos</h1>
      <ul>
        {/* Revisão de map (Aula 01) e key */}
        {equipamentos.map(e => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
