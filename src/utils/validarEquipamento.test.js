
import { describe, it, expect } from 'vitest'
import { validarEquipamento } from './validarEquipamento'

describe('validarEquipamento', () => {
  it('deve aceitar campos preenchidos', () => {
    expect(validarEquipamento('Cadeira de rodas', '20')).toBe(true)
  })

  it('deve lançar erro quando os campos estiverem vazios', () => {
    expect(() => validarEquipamento('', '')).toThrow()
  })
})
