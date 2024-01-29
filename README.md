
#  API de Criador de Eventos de Amigo Secreto
Esta é uma API desenvolvida em Node.js com TypeScript, usando o Prisma ORM para interação com o banco de dados PostgreSQL. A API permite a criação e gerenciamento de eventos de Amigo Secreto, tanto para administradores quanto para usuários comuns. Ela inclui funcionalidades para realizar o sorteio do Amigo Secreto de forma automatizada.




## Instalação

Para instalar e executar esta API em seu ambiente local, siga as instruções abaixo:

1. clone este repositório
```bash
  git clone https://github.com/seu-usuario/api-amigo-secreto.git
```

2. Instale as dependências usando npm ou yarn
```bash
  npm install ou yarn install
```
3. Instale as dependências usando npm ou yarn
```bash
  npm install ou yarn install
```

4. Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env e preencha as variáveis de ambiente necessárias, como a URL do banco de dados PostgreSQL.

5. Execute as migrações do prisma
```bash
  npm prisma migrate dev
```

6. Inicie o servidor
```bash
  npm run dev
```
A API estará disponível em http://localhost:3000 por padrão, mas você pode configurar a porta no arquivo .env.

## Validação de Dados
Este projeto utiliza a biblioteca Zod para validação de dados, garantindo que apenas dados válidos sejam aceitos pela API.

## Banco de Dados
O banco de dados PostgreSQL é utilizado para armazenar os dados relacionados aos eventos de Amigo Secreto e aos participantes.
