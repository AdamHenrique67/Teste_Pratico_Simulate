# Simulate Valores Planos de Saúde

**API para gerenciamento de Doctors**

  - [Execução local](#execução-local)
    - [Pré-requisitos](#pré-requisitos)
    - [Executando o projeto](#executando-o-projeto)
  - [Sobre o projeto](#sobre-o-projeto)
    - [Estrutura de diretórios do Back-end](#estrutura-de-diretórios-do-Back-end)
    - [Testes](#testes)




## Execução local

### Pré-requisitos

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/), [React.js]

### Executando o projeto

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/AdamHenrique67/Teste_Pratico_Simulate.git && cd Teste_Pratico_Simulate
```

## Sobre o projeto

### Estrutura de diretórios do Back-end

```
src/
 ├─ application/
 |   ├─ controllers/
 |   ├─ errors/
 |   └─ helpers/
 ├─ domain/
 |   ├─ contract/
 |   ├─ entities/
 |   ├─ gateways/
 |   ├─ useCases/
 ├─ infra/
 |   ├─ gateways/
 |   ├─ jsons/
  ─ main/
 |   ├─ adapters/
 |   ├─ config/
 |   ├─ factories/
 |   ├─ middlewares/
 |   ├─ routes/
 tests/

```

- **Domain**: implementação de interfaces das regras de negócios e implementação dos useCases
- **Application**: Controladores, errors e helpers e utilitários relacionados aos mesmos
- **Infra**: Implementaçãos dos repositórios(no Caso foi usado um json) de ferramentas de terceiros(no caso usei o FileSystem)
- **Main**: Rotas, Middlewares, factories e configs

### Executar o Projeto
Com o terminal aberto

Abra o VSCode usando o comando abaixo,mas não feche o terminal

```sh
  code .
```
Digite os comandos abaixo no terminal do VSCode

```sh
  cd Back-End && npm install && npm start
```

Volte para o primeiro terminal e digite o código abaixo para iniciar o Front-End

```sh
  cd Front-End && npm install && npm start
```

### Testes

Cado deseje rodar os testes. Insira o comando abaixo dentro da pasta Back-End

```sh
  npm run test
```


