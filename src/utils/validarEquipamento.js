
export function validarEquipamento(nome, preco) {
  if (!nome.trim() || !preco.trim()) {
    throw new Error('Preencha todos os campos.')
  }

  return true
}
