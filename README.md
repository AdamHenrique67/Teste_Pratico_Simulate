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

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/)

### Executando o projeto

Abra o terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/AdamHenrique67/Teste_Pratico_Simulate.git && cd Teste_Pratico_Simulate
```
**2** - Use o comandos abaixo para abrir o VSCode e rodar o Back-End

```sh
code .
```
**3** - No terminal do VSCode use os comandos abaixo

```sh
cd Back-End && npm install && npm start
```
**4** - Volte ao primeiro terminal e use os comandos abaixo para rodar o Front-End

```sh
cd Front-End && npm install && npm start
```
**4** - Em seguida, copie o endereço local que aparecer na terminal e cole no navegador para ter acesso ao Front-End

## Sobre o projeto

### Estrutura de diretórios do Back-End

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

### Testes

Estando dentro da pasta Back-End 

Para rodas os testes

```sh
npm run test
```

