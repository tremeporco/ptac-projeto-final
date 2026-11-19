
// src/api.js — o único lugar do app que conhece a URL da API
const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function requisicao(caminho, opcoes = {}) {
  const { signal, ...resto } = opcoes
  const url = `${BASE_URL}${caminho}`
  const configuracoes = {
    headers: { 'Content-Type': 'application/json' },
    ...resto,
    ...(signal ? { signal } : {}),
  }

  if (opcoes.body) {
    configuracoes.body = JSON.stringify(opcoes.body)
  }

  const resp = await fetch(url, configuracoes)

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} ${resp.statusText}`)
  }

  if (resp.status === 204) return null
  return await resp.json()
}

export async function apiGet(caminho, opcoes = {}) {
  return requisicao(caminho, { method: 'GET', ...opcoes })
}

export async function apiPost(caminho, body, opcoes = {}) {
  return requisicao(caminho, { method: 'POST', body, ...opcoes })
}

export async function apiPut(caminho, body, opcoes = {}) {
  return requisicao(caminho, { method: 'PUT', body, ...opcoes })
}

export async function apiDelete(caminho, opcoes = {}) {
  return requisicao(caminho, { method: 'DELETE', ...opcoes })
}
