const CadastroClientes = require("./service/CadastroClientes");
const RegistroDeEntradas_E_Saidas = require("./service/RegistroDeEntradas_E_Saidas");
const RelatoriosGerenciais = require("./service/RelatoriosGerenciais");

const Estudante = require("./model/Estudante");
const Professor = require("./model/Professor");
const Empresa = require("./model/Empresa");

// Classe principal
// Aqui é onde juntamos todas as peças e fazemos um teste do sistema.
class App {
  static main() {
    const cadastro = new CadastroClientes();
    const registros = new RegistroDeEntradas_E_Saidas(cadastro);
    const relatorios = new RelatoriosGerenciais(cadastro, registros);

    // CADASTRO DE CLIENTES 

    const estudante = new Estudante("12345678901", "João Silva", 30);
    estudante.adicionarPlaca("ABC1D23");
    cadastro.cadastrarCliente(estudante);

    const professor = new Professor("34567890123", "Carlos Oliveira");
    professor.adicionarPlaca("JKL4G56");
    professor.adicionarPlaca("GHI3F45");
    cadastro.cadastrarCliente(professor);

    const empresa = new Empresa("56789012345", "Tecnopuc S.A.");
    empresa.adicionarPlaca("STU7J89");
    empresa.adicionarPlaca("VWX8K90");
    empresa.adicionarPlaca("YZA9L01");
    cadastro.cadastrarCliente(empresa);

    //ENTRADAS

    registros.autorizarEntrada("ABC1D23", new Date("2025-11-27T08:30:00")); // estudante
    registros.autorizarEntrada("JKL4G56", new Date("2025-11-27T07:00:00")); // professor
    registros.autorizarEntrada("STU7J89", new Date("2025-11-27T10:00:00")); // empresa
    registros.autorizarEntrada("ZZZ9Z99", new Date("2025-11-27T09:00:00")); // avulso

    //SAÍDAS

    console.log("Saída estudante:");
    console.log(registros.processarSaida("ABC1D23", new Date("2025-11-27T12:45:00")));

    console.log("\nSaída professor:");
    console.log(registros.processarSaida("JKL4G56", new Date("2025-11-27T18:30:00")));

    console.log("\nSaída empresa após meia-noite:");
    console.log(registros.processarSaida("STU7J89", new Date("2025-11-28T09:00:00")));

    console.log("\nSaída avulso pagando menos do que deve, gerando bloqueio:");
    console.log(registros.processarSaida("ZZZ9Z99", new Date("2025-11-27T12:00:00"), 0));

    //RELATÓRIOS

    console.log("\nSituação do estudante:");
    console.log(relatorios.situacaoCliente("12345678901"));

    console.log("\nClientes impedidos:");
    console.log(relatorios.clientesImpedidos());

    console.log("\nTotal arrecadado no período:");
    console.log(
      relatorios.totalArrecadadoPorPeriodo(
        new Date("2025-11-27T00:00:00"),
        new Date("2025-11-28T23:59:59")
      )
    );

    console.log("\nTop 10 frequentes de 2025:");
    console.log(relatorios.top10FrequentesAno(2025));
  }
}

App.main();

module.exports = App;
