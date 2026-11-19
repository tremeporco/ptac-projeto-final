export function filtrarEquipamentos(equipamentos, busca) {
  return equipamentos.filter(e =>
    e.title.toLowerCase().includes(busca.toLowerCase())
  )
}