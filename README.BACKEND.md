# Desafio Node.js e React.js

### Versões de dependências utilizadas

- Node 18.17.0
- Npm 9.6.7
- Nest 9.0.0

### Baixe e execute o projeto localmente

**1 -** Atenção!! Para iniciar este projeto sem erro precisa primeiro iniciar a API do Backend

**2 -** Clone o projeto e instale as dependências:

```
$ git https://github.com/wagnerGCastro/desafio-nobuzz-nodejs-reactjs
$ cd desafio-nobuzz-nodejs-reactjs

```

**2 -** Executar os camandos docker para subir o Banco de Dados, Backend Localmente,

```
1- $ docker-compose -f docker-compose.dev.yml --compatibility build --no-cache backend postgres pgadmin

2- $ docker-compose -f docker-compose.dev.yml --compatibility up --remove-orphans backend

```

**3 -** Aguardar alguns segundos para o container executar, para acessar o banco com usuário default:

```
- Usuário Admin
  user: admin
  password: postgres
  database: postgres

```

**3 -** Depois do banco Postgres ter subido sem erro, agora pode acessar o Frotend:

Abra o navegador e acesse [https://localhost:3071](https://localhost:3071) para visualizar o projeto.

**3 -** O arquivo api.example.http dentro da pasta backend contém os endpoints da APi de exemplo
para executar o aquivo precisar instalar o plugin REST Client do Vscode

```

$ ./desafio-nobuzz-nodejs-reactjs/backend/api.example.http

```
