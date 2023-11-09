# Desafio Node.js e React.js

### Versões de dependências utilizadas

- Node 18.17.0
- Npm 9.6.7
- Next 13.2.4

### Baixe e execute o projeto localmente

**1 -** Atenção!! Para iniciar este projeto sem erro precisa primeiro iniciar a API do Backend

**2 -** Clone o projeto e instale as dependências:

```
$ git https://github.com/wagnerGCastro/desafio-nobuzz-petroplus-nodejs-react
$ cd desafio-nobuzz-petroplus-nodejs-react
```

**2 -** Executar os camandos docker para subir o frontend localmente,

```
1- $ docker-compose --project-name nobuzz-petroplus -f docker-compose.dev.yml --compatibility build --no-cache frontend

2- $ docker-compose --project-name nobuzz-petroplus -f docker-compose.dev.yml --compatibility up --remove-orphans frontend
```

**3 -** Para logar no sistema precisa primeiro cadastrar um usuário na API:

```
- Usuário Admin
  email: wagner.castro@teste.com
  password: @123Alfa
```

**4 -** Depois do banco Postgres ter subido sem erro no backend, agora pode acessar o frontend:

Abra o navegador e acesse [http://localhost:3089](http://localhost:3089) para visualizar o projeto.

**5 -** O arquivo api.example.http dentro da pasta backend contém os endpoints da API de exemplo
para executar o aquivo precisar instalar o plugin REST Client do Vscode

```
$ ./desafio-nobuzz-petroplus-nodejs-react/backend/api.example.http
```

**6 -** Preview do projeto finalizado:)

<img src="./imgs/04-demostracao.gif" alt="tela demostracao" />

###

<img src="./imgs/01-tela-login.png" alt="tela login" />

###

<img src="./imgs/02-tela-home.png" alt="tela home" />

###

<img src="./imgs/03-tela-de-cadastro.png" alt="tela cadastro" />
```
