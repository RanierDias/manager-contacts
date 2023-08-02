## Descrição

Este é um projeto MVP para gerenciamento de contatos, é uma api simples com duas rotas diponiveis, as de usuários e contatos.

## Instalação das dependencias

```bash
$ npm install
```

## Inicialização do banco de dados

```bash
# only development
$ npx prisma migrate dev

# only production
$ npx prisma migrate deploy
```

## Iniciar servidor

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentação

A documentação foi feita pela api do proprio nest swagger e você pode [acessar-la](http://localhost:5000/docs) após iniciar o servidor.

## Desenvolvido por

- Author - [Ranier Dias](https://www.linkedin.com/in/ranier-dias/)
- Website - [Portifolio](https://portfolio-cyan-theta-24.vercel.app/)
