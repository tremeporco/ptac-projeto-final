
import { useEffect, useState } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    // Roda quando o componente é montado
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsuarios(data))
  }, [])

  return (
    <main>
      <h1>Usuários</h1>
      <ul>
        {/* Revisão de map (Aula 01) e key */}
        {usuarios.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
