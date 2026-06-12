const Cliente = require("./Cliente");

// Estudante: pode ter apenas 1 placa, paga por ingresso e usa saldo pré-pago.
class Estudante extends Cliente {
  static CUSTO_FIXO_POR_INGRESSO = 10;

  constructor(cpf, nome, saldoInicial = 0) {
    super(cpf, nome);
    this._saldo = saldoInicial;
  }

  get saldo() {
    return this._saldo;
  }

  carregarSaldo(valor) {
    if (valor <= 0) throw new Error("O valor de recarga deve ser positivo.");
    this._saldo += valor;
  }

  adicionarPlaca(placa) {
    // Regra: estudante só pode ter uma placa.
    if (this._placas.size >= 1 && !this.possuiPlaca(placa)) {
      throw new Error("Estudante pode cadastrar apenas uma placa.");
    }
    super.adicionarPlaca(placa);
  }

  podeEntrar(registroService) {
    if (this._saldo < 0) {
      return { permitido: false, motivo: "Estudante com saldo negativo. Nova entrada bloqueada." };
    }

    const algumVeiculoEstacionado = registroService.clientePossuiTicketAberto(this);
    if (algumVeiculoEstacionado) {
      return { permitido: false, motivo: "Estudante já possui veículo estacionado." };
    }

    return { permitido: true, motivo: "Entrada permitida para estudante." };
  }

  calcularCusto(ticket) {
    const entrada = ticket.entrada;
    const saida = ticket.saida;

    // Se sair no mesmo dia, paga 1 ingresso.
    // Se virar a meia-noite, paga mais um ingresso por dia diferente.
    const dataEntrada = entrada.toISOString().substring(0, 10);
    const dataSaida = saida.toISOString().substring(0, 10);

    if (dataEntrada === dataSaida) {
      return Estudante.CUSTO_FIXO_POR_INGRESSO;
    }

    const msPorDia = 24 * 60 * 60 * 1000;
    const entradaMeiaNoite = new Date(dataEntrada + "T00:00:00");
    const saidaMeiaNoite = new Date(dataSaida + "T00:00:00");
    const diferencaDias = Math.round((saidaMeiaNoite - entradaMeiaNoite) / msPorDia);

    return (diferencaDias + 1) * Estudante.CUSTO_FIXO_POR_INGRESSO;
  }

  debitar(valor) {
    // A saída é liberada mesmo se o saldo ficar negativo.
    this._saldo -= valor;
  }
}

module.exports = Estudante;
