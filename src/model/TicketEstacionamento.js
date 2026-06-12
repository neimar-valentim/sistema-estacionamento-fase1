// TicketEstacionamento representa uma permanência no estacionamento.
// ELI5: é como o "papelzinho" que guarda entrada, saída e cobrança.
class TicketEstacionamento {
  constructor(placa, tipoCliente, entrada = new Date()) {
    this.placa = placa.toUpperCase();
    this.tipoCliente = tipoCliente;
    this.entrada = entrada;
    this.saida = null;

    this.custo = 0;
    this.identificadorDesconto = "nenhum";
    this.valorDesconto = 0;
    this.valorDevido = 0;
    this.valorPago = 0;
  }

  registrarSaida(saida = new Date()) {
    this.saida = saida;
  }

  fecharCobranca(custo, identificadorDesconto, valorDesconto, valorPago) {
    this.custo = custo;
    this.identificadorDesconto = identificadorDesconto || "nenhum";
    this.valorDesconto = valorDesconto;
    this.valorDevido = custo - valorDesconto;
    this.valorPago = valorPago;
  }

  estaAberto() {
    return this.saida === null;
  }
}

module.exports = TicketEstacionamento;
