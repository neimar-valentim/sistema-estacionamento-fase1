// Cliente avulso não possui CPF/CNPJ no sistema.
// Ele é identificado apenas pela placa.
class ClienteAvulso {
  static VALOR_HORA = 5;
  static VALOR_DIARIA = 30;
  static LIMITE_HORAS = 6;

  constructor(placa) {
    this._placa = placa.toUpperCase();
  }

  get placa() {
    return this._placa;
  }

  get tipo() {
    return "Avulso";
  }

  calcularCusto(ticket) {
    const entrada = ticket.entrada;
    const saida = ticket.saida;

    const dataEntrada = entrada.toISOString().substring(0, 10);
    const dataSaida = saida.toISOString().substring(0, 10);

    // Regra: se passar da meia-noite, cobra nova diária.
    if (dataEntrada !== dataSaida) {
      const msPorDia = 24 * 60 * 60 * 1000;
      const entradaMeiaNoite = new Date(dataEntrada + "T00:00:00");
      const saidaMeiaNoite = new Date(dataSaida + "T00:00:00");
      const diferencaDias = Math.round((saidaMeiaNoite - entradaMeiaNoite) / msPorDia);

      return (diferencaDias + 1) * ClienteAvulso.VALOR_DIARIA;
    }

    const milissegundos = saida - entrada;
    const horas = Math.ceil(milissegundos / (1000 * 60 * 60));

    if (horas <= ClienteAvulso.LIMITE_HORAS) {
      return horas * ClienteAvulso.VALOR_HORA;
    }

    return ClienteAvulso.VALOR_DIARIA;
  }
}

module.exports = ClienteAvulso;
