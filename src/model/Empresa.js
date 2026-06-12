const Cliente = require("./Cliente");

// Empresa: pode ter veículos ilimitados, paga diária e pode ficar inadimplente.
class Empresa extends Cliente {
  static VALOR_DIARIA = 40;
  static MULTA_APOS_MEIA_NOITE = 30;

  constructor(cnpj, nome, debitoInicial = 0) {
    super(cnpj, nome);
    this._debito = debitoInicial;
    this._inadimplente = false;
  }

  get debito() {
    return this._debito;
  }

  get inadimplente() {
    return this._inadimplente;
  }

  adicionarDebito(valor) {
    this._debito += valor;
  }

  pagarBoleto(valor) {
    this._debito -= valor;

    if (this._debito <= 0) {
      this._debito = 0;
      this._inadimplente = false;
    }
  }

  marcarInadimplente() {
    this._inadimplente = true;
  }

  regularizar() {
    this._inadimplente = false;
    this._debito = 0;
  }

  podeEntrar(registroService) {
    if (this._inadimplente) {
      return { permitido: false, motivo: "Empresa inadimplente. Todos os veículos estão bloqueados." };
    }

    return { permitido: true, motivo: "Entrada permitida para empresa." };
  }

  calcularCusto(ticket) {
    const entrada = ticket.entrada;
    const saida = ticket.saida;

    const dataEntrada = entrada.toISOString().substring(0, 10);
    const dataSaida = saida.toISOString().substring(0, 10);

    // Empresa paga pelo menos uma diária.
    let total = Empresa.VALOR_DIARIA;

    // Se passou da meia-noite, aplica multa por dia de atraso.
    if (dataEntrada !== dataSaida) {
      const msPorDia = 24 * 60 * 60 * 1000;
      const entradaMeiaNoite = new Date(dataEntrada + "T00:00:00");
      const saidaMeiaNoite = new Date(dataSaida + "T00:00:00");
      const diasAposMeiaNoite = Math.round((saidaMeiaNoite - entradaMeiaNoite) / msPorDia);

      total += diasAposMeiaNoite * Empresa.MULTA_APOS_MEIA_NOITE;
    }

    return total;
  }
}

module.exports = Empresa;
