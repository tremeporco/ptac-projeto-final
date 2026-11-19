
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ListaEquipamentos from './ListaEquipamentos'

const equipamentos = [
  { id: 1, title: 'Cadeira de rodas', body: '20' },
  { id: 2, title: 'Muletas', body: '10' },
]

describe('ListaEquipamentos', () => {
  it('deve mostrar os equipamentos na tela', () => {
    render(
      <ListaEquipamentos
        equipamentos={equipamentos}
        onEditar={() => {}}
        onExcluir={() => {}}
      />
    )

    expect(screen.getByText('Cadeira de rodas - 20')).toBeInTheDocument()
    expect(screen.getByText('Muletas - 10')).toBeInTheDocument()
  })

  it('deve chamar as funções ao clicar nos botões', () => {
    const onEditar = vi.fn()
    const onExcluir = vi.fn()

    render(
      <ListaEquipamentos
        equipamentos={equipamentos}
        onEditar={onEditar}
        onExcluir={onExcluir}
      />
    )

    fireEvent.click(screen.getAllByText('Editar')[0])
    fireEvent.click(screen.getAllByText('Excluir')[0])

    expect(onEditar).toHaveBeenCalledWith(equipamentos[0])
    expect(onExcluir).toHaveBeenCalledWith(1)
  })
})
