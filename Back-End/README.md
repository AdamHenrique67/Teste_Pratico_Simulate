# Simulate Valores Planos de Saúde

**API para gerenciamento de Doctors**

  - [Execução local](#execução-local)
    - [Pré-requisitos](#pré-requisitos)
    - [Executando o projeto](#executando-o-projeto)
  - [Sobre o projeto](#sobre-o-projeto)
    - [Estrutura de diretórios](#estrutura-de-diretórios)
    - [Documentação](#documentação)
    - [Testes](#testes)
      - [Executando os testes](#executando-os-testes)
      - [Resultado](#resultado)



## Execução local

### Pré-requisitos

- [Git](https://git-scm.com/download/), [Node.js](https://nodejs.org/en/download/), [React.js]

### Executando o projeto

Todos os comandos abaixo são feitos no terminal

**1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git clone https://github.com/AdamHenrique67/Teste.git && cd teste
```

## Sobre o projeto

### Estrutura de diretórios

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

Para rodas os testes


```sh
npm run test
```

