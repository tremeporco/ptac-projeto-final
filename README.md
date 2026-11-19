# Catálogo de Equipamentos Médicos

## Integrantes
- Eduardo Silva Passarelo
- Yasmin Vitória da Silva Prestes

## Sobre o projeto
Sistema para cadastrar, listar, editar, excluir e pesquisar equipamentos médicos para aluguel, como cadeiras de rodas, muletas e andadores.

## Tecnologias
- React e Vite
- JavaScript e CSS
- Fetch API
- Vitest e React Testing Library

## API utilizada
 JSONPlaceholder, por ser uma alternativa temporária por termos feito separado com de Ptas, na qual eu deveria ter conectado.

Base URL: https://jsonplaceholder.typicode.com
a que usamos em aula só para cumprir os requisitos até eu ligar com o Backend

| Método | Rota | Função |
|---|---|---|
| GET | /posts | Listar |
| POST | /posts | Cadastrar |
| PUT | /posts/:id | Editar |
| DELETE | /posts/:id | Excluir |

**Campos:** `id` (identificador), `title` (nome) e `body` (preço).

### Exemplo de resposta JSON
{
  "userId": 1,
  "id": 1,
  "title": "cadeira de rodas",
  "body": "preço de 20 R$ por semana"
}
 a Api consome os dados como pedido, mas não permance

## MongoDB e SQL
No Mongo os dados são guardados em documentos. Cada documento possui um identificador `_id`,  com 24 caracteres hexadecimais.já a JSONPlaceholder utiliza IDs numéricos, tipo 1, 2 , 3...

## Como executar
npm install
npm run dev

Para testes:
npm test

Para gerar a versão de produção:
npm run build


## Testes
Fizemos 7 testes com Vitest e RTL, verificando a busca, a validação e os componentes da aplicação.

