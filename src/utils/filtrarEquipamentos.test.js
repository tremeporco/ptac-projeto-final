
import { describe, it, expect } from 'vitest'
import { filtrarEquipamentos } from './filtrarEquipamentos'

const equipamentos = [
  { id: 1, title: 'Cadeira de rodas' },
  { id: 2, title: 'Muletas' },
  { id: 3, title: 'Cadeira de banho' },
]

describe('filtrarEquipamentos', () => {
  it('deve encontrar equipamentos pelo nome', () => {
    const resultado = filtrarEquipamentos(equipamentos, 'cadeira')

    expect(resultado).toHaveLength(2)
  })

  it('deve retornar todos quando a busca estiver vazia', () => {
    const resultado = filtrarEquipamentos(equipamentos, '')

    expect(resultado).toHaveLength(3)
  })

  it('deve retornar uma lista vazia quando não encontrar resultados', () => {
    const resultado = filtrarEquipamentos(equipamentos, 'andador')

    expect(resultado).toHaveLength(0)
  })
})
