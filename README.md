# Sistema de Controle de Estacionamento de Veículos de Passeio - Fase 1

Projeto acadêmico desenvolvido para a disciplina de Programação Orientada a Objetos da Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS).

## Descrição

O projeto consiste no desenvolvimento de um sistema de controle de estacionamento de veículos de passeio utilizando JavaScript e conceitos de Programação Orientada a Objetos (POO).

Nesta primeira fase foram implementadas as principais entidades do sistema, regras de negócio e funcionalidades básicas de cadastro, entrada, saída e geração de relatórios.

## Funcionalidades Implementadas

### Cadastro de Clientes

* Cadastro de Estudantes;
* Cadastro de Professores;
* Cadastro de Empresas;
* Associação de placas aos clientes cadastrados.

### Controle de Estacionamento

* Registro de entrada de veículos;
* Registro de saída de veículos;
* Controle de veículos estacionados.

### Regras de Negócio

#### Cliente Avulso

* Cobrança por hora até 6 horas;
* Cobrança por diária para períodos superiores;
* Bloqueio de placa em caso de inadimplência.

#### Estudante

* Cadastro de um veículo por CPF;
* Controle de saldo pré-pago.

#### Professor

* Cadastro de até dois veículos;
* Estacionamento gratuito;
* Apenas um veículo estacionado simultaneamente.

#### Empresa

* Cadastro de múltiplos veículos;
* Controle de débitos acumulados.

### Relatórios

* Situação de cliente;
* Clientes impedidos;
* Total arrecadado por período;
* Top 10 clientes mais frequentes do ano.

## Tecnologias Utilizadas

* JavaScript
* Node.js

## Conceitos Aplicados

* Programação Orientada a Objetos (POO)
* Encapsulamento
* Herança
* Polimorfismo
* Abstração
* Map
* Set

## Estrutura do Projeto

```text
src
├── model
├── service
└── App.js
```

### model

Contém as classes responsáveis pela representação das entidades do sistema.

### service

Contém as regras de negócio e funcionalidades do estacionamento.

### App.js

Classe principal responsável pela execução e demonstração do funcionamento do sistema.

## Como Executar

Execute o projeto utilizando:

```bash
node src/App.js
```

## Autor

Neimar da Silva Valentim

Projeto acadêmico desenvolvido para a disciplina de Programação Orientada a Objetos da PUCRS.
