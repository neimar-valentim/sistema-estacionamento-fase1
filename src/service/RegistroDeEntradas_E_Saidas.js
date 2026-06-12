const TicketEstacionamento = require("../model/TicketEstacionamento");
const ClienteAvulso = require("../model/ClienteAvulso");
const DescontoClienteFrequente = require("../model/DescontoClienteFrequente");
const Estudante = require("../model/Estudante");
const Empresa = require("../model/Empresa");

// Controla entrada, saída e cobrança.
class RegistroDeEntradas_E_Saidas {
  constructor(cadastroClientes) {
    this.cadastroClientes = cadastroClientes;
    this.tickets = [];
    this.ticketsAbertos = new Map(); // placa -> ticket aberto
    this.descontos = [new DescontoClienteFrequente()];
  }

  autorizarEntrada(placa, dataHoraEntrada = new Date()) {
    const placaMaiuscula = placa.toUpperCase();

    if (this.ticketsAbertos.has(placaMaiuscula)) {
      throw new Error("Este veículo já está estacionado.");
    }

    if (this.cadastroClientes.placaEstaBloqueada(placaMaiuscula)) {
      throw new Error("Placa avulsa bloqueada por inadimplência anterior.");
    }

    const clienteCadastrado = this.cadastroClientes.buscarClientePorPlaca(placaMaiuscula);
    const cliente = clienteCadastrado || new ClienteAvulso(placaMaiuscula);

    if (clienteCadastrado) {
      const resultado = cliente.podeEntrar(this);
      if (!resultado.permitido) {
        throw new Error(resultado.motivo);
      }
    }

    const ticket = new TicketEstacionamento(placaMaiuscula, cliente.tipo, dataHoraEntrada);

    this.tickets.push(ticket);
    this.ticketsAbertos.set(placaMaiuscula, ticket);

    return ticket;
  }

  processarSaida(placa, dataHoraSaida = new Date(), valorPago = null) {
    const placaMaiuscula = placa.toUpperCase();
    const ticket = this.ticketsAbertos.get(placaMaiuscula);

    if (!ticket) {
      throw new Error("Não existe registro de entrada aberto para esta placa.");
    }

    ticket.registrarSaida(dataHoraSaida);

    const clienteCadastrado = this.cadastroClientes.buscarClientePorPlaca(placaMaiuscula);
    const cliente = clienteCadastrado || new ClienteAvulso(placaMaiuscula);

    const custo = cliente.calcularCusto(ticket);
    ticket.custo = custo;

    const desconto = this._calcularMelhorDesconto(ticket);
    const valorDevido = custo - desconto.valor;

    if (valorPago === null) {
      // Para professor, estudante e empresa, o sistema pode assumir o valor conforme a regra.
      valorPago = valorDevido;
    }

    if (cliente instanceof Estudante) {
      cliente.debitar(valorDevido);
    }

    if (cliente instanceof Empresa) {
      cliente.adicionarDebito(valorDevido);
    }

    // Cliente avulso que não paga é bloqueado, mas a saída é liberada.
    if (!clienteCadastrado && valorPago < valorDevido) {
      this.cadastroClientes.bloquearPlacaAvulsa(placaMaiuscula);
    }

    ticket.fecharCobranca(custo, desconto.identificador, desconto.valor, valorPago);
    this.ticketsAbertos.delete(placaMaiuscula);

    return ticket;
  }

  buscarTicketAberto(placa) {
    return this.ticketsAbertos.get(placa.toUpperCase()) || null;
  }

  clientePossuiTicketAberto(cliente) {
    for (const placa of cliente.placas) {
      if (this.ticketsAbertos.has(placa)) {
        return true;
      }
    }
    return false;
  }

  listarTickets() {
    return this.tickets;
  }

  _calcularMelhorDesconto(ticket) {
    let melhor = { identificador: "nenhum", valor: 0 };

    for (const desconto of this.descontos) {
      const resultado = desconto.aplicar(ticket, this.tickets);

      if (resultado.valor > melhor.valor) {
        melhor = resultado;
      }
    }

    return melhor;
  }
}

module.exports = RegistroDeEntradas_E_Saidas;
