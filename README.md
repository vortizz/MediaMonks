## Descrição

Projeto realizado com o framework do Node.js, chamado NestJS.
Diversas tecnologias também usadas através do framework:
 - Mongoose (MongoDB)
 - JWT;
 - Passport
 - Passport-local
 - Class-validator

Para rodar a API, necessário ter instalado Node.js, Docker, NestJS e NPM.

## Observações

 - Ao iniciar a API, é criado um usuário ADMIN padrão, retornando o username e senha no log;
 - As configurações de conexão do MongoDB, porta de execução da API e dados do usuário ADMIN padrão estão no arquivo .env na pasta raiz;
 - Todos os endpoints, exceto o login, necessita de autenticação;
 - Para a importação da collection dos endpoints no Postman, há o arquivo MediaMonks.postman_collection.json; 

## Instalação

```bash
$ npm install
```

## Rodar API localhost

```bash
# Desenvolvimento
$ npm run start

# Modo em tempo real
$ npm run start:dev
```

## Rodar API no Docker

```bash
$ docker build . -t <username>/<nome_api>

$ docker run -p 3000:8080 <username>/<nome_api>
```

## Endpoint

### Autenticação:

Retorna o token de autenticação para ser usado no header dos endpoints

```
  curl --location --request POST 'localhost:8080/api/service/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "",
      "password": ""
  }'
```

Casos de erros:
 - Preenchido email e/ou senha errados é retornado o status 400 (BadRequest)


### Exibir seus dados (ADMIN):

Retorna um objeto com os dados do usuário

```
  curl --location --request GET 'localhost:8080/api/service/master/profile/get' \ 
  --header 'Authorization: Bearer <token>'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)

### Atualizar sua senha (ADMIN):

Retorna um objeto com os dados preenchidos

```
  curl --location --request PUT 'localhost:8080/api/service/master/profile/update' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "password": ""
  }'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)
 - Preenchido os dados fora das regras dos seus respectivos campos retorna o status 400 (BadRequest)

 ### Criar usuário (ADMIN):

Retorna um objeto com os dados preenchidos

```
  curl --location --request POST 'localhost:8080/api/service/master/user/create' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "",
    "username": "",
    "password": "",
    "login_type": ""
  }'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)
 - Preenchido os dados fora das regras dos seus respectivos campos retorna o status 400 (BadRequest)
 - Username já existente não cria um novo usuário, porém retorna o status 201 (Created)

 ### Deletar usuário (ADMIN):

Não há retorno com o status 204 (No content)

```
  curl --location --request DELETE 'localhost:8080/api/service/master/user/delete/:idUser' \
--header 'Authorization: Bearer <token>'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)

 ### Listar todos usuários (ADMIN):

Retorna um array de objetos com os dados preenchidos

```
  curl --location --request GET 'localhost:8080/api/service/master/user/list' \
--header 'Authorization: Bearer <token>'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)

 ### Listar todos usuários (ADMIN):

Retorna um array de objetos com os dados preenchidos

```
  curl --location --request GET 'localhost:8080/api/service/master/user/list' \
--header 'Authorization: Bearer <token>'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)

### Atualizar usuário (ADMIN):

Retorna um objeto com os dados preenchidos do usuário.
Apenas é possível atualizar o nome e o username

```
  curl --location --request PUT 'localhost:8080/api/service/master/user/update/:idUser' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "",
    "username": ""
  }'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário normal ter requisitado o endpoint retorna o status 403 (Forbidden)
 - Username já existente não cria um novo usuário e retorna o status 400 (BadRequest)
 - Preenchido os dados fora das regras dos seus respectivos campos retorna o status 400 (BadRequest)

 ### Exibir seus dados (USER):

Retorna um objeto com os dados preenchidos do usuário

```
  curl --location --request GET 'localhost:8080/api/service/user/profile/get' \
  --header 'Authorization: Bearer <token>'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário ADMIN ter requisitado o endpoint retorna o status 403 (Forbidden)

 ### Atualizar sua senha (USER):

Retorna um objeto com os dados preenchidos do usuário

```
  curl --location --request PUT 'localhost:8080/api/service/user/profile/update' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "password": ""
  }'
```

Casos de erros:
 - Token ter expirado retorna o status 401 (Unauthorized)
 - Usuário ADMIN ter requisitado o endpoint retorna o status 403 (Forbidden)
 - Preenchido os dados fora das regras dos seus respectivos campos retorna o status 400 (BadRequest)