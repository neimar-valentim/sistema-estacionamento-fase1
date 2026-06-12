# Sistema de Controle de Estacionamento de Veículos de Passeio

## Autor

Neimar da Silva Valentim

## Sobre o projeto

Este projeto foi desenvolvido para a disciplina de Programação Orientada a Objetos utilizando JavaScript.

A ideia do sistema é controlar a entrada e a saída de veículos em um estacionamento com diferentes tipos de clientes:

* Clientes Avulsos;
* Estudantes;
* Professores;
* Empresas.

Cada tipo de cliente possui regras próprias de utilização e cobrança.

---

## Explicando de forma simples

Imagine um estacionamento muito grande.

Quando um veículo chega, o sistema verifica:

* Quem é o cliente;
* Se ele pode entrar;
* Se possui alguma restrição.

Quando o veículo sai, o sistema:

* Calcula o valor a ser cobrado;
* Verifica descontos;
* Registra as informações da saída;
* Atualiza os dados do cliente.

Tudo isso é feito automaticamente pelas classes do sistema.

---

## Conceitos de Programação Orientada a Objetos utilizados

Durante o desenvolvimento foram aplicados os principais conceitos de orientação a objetos:

### Classes

As classes representam os elementos do sistema, como:

* Cliente;
* Estudante;
* Professor;
* Empresa;
* TicketEstacionamento.

### Herança

As classes Estudante, Professor e Empresa herdam características da classe Cliente.

### Encapsulamento

Os dados dos objetos são protegidos e manipulados através de métodos específicos.

### Polimorfismo

Cada tipo de cliente possui sua própria forma de calcular custos e validar entradas.

---

## Estrutura do projeto

```text
src/
├── model/
├── service/
└── App.js
```

### Pasta model

Contém as classes que representam os objetos do sistema.

Exemplos:

* Cliente;
* Estudante;
* Professor;
* Empresa;
* TicketEstacionamento.

### Pasta service

Contém as regras de funcionamento do sistema.

Exemplos:

* CadastroClientes;
* RegistroDeEntradas_E_Saidas;
* RelatoriosGerenciais.

### App.js

Classe principal responsável por executar o sistema.

---

## Funcionalidades implementadas

* Cadastro de clientes;
* Cadastro de placas;
* Controle de entrada;
* Controle de saída;
* Cálculo de cobranças;
* Controle de inadimplência;
* Bloqueio de clientes quando necessário;
* Aplicação de descontos;
* Relatórios gerenciais.

---

## Estruturas de dados utilizadas

O projeto utiliza:

### Set

Utilizado para:

* Evitar placas duplicadas;
* Controlar listas de bloqueio.

### Map

Utilizado para:

* Localizar clientes rapidamente;
* Associar placas aos seus proprietários;
* Controlar veículos estacionados.

---

## Como executar

1. Instalar o Node.js.
2. Abrir o projeto no Visual Studio Code.
3. Abrir o terminal.
4. Executar o comando:

```bash
node src/App.js
```

---

