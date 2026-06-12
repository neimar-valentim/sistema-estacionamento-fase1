const Desconto = require("./Desconto");

// Desconto para cliente avulso frequente.
// Regra: 3 usos nos últimos 5 dias dão 20% de desconto.
class DescontoClienteFrequente extends Desconto {
  aplicar(ticket, todosOsTickets) {
    if (ticket.tipoCliente !== "Avulso") {
      return { identificador: "nenhum", valor: 0 };
    }

    const cincoDiasEmMs = 5 * 24 * 60 * 60 * 1000;
    const inicioJanela = new Date(ticket.entrada.getTime() - cincoDiasEmMs);

    const usosRecentes = todosOsTickets.filter((t) => {
      return (
        t.placa === ticket.placa &&
        t.tipoCliente === "Avulso" &&
        t.saida !== null &&
        t.entrada >= inicioJanela &&
        t.entrada < ticket.entrada
      );
    });

    if (usosRecentes.length >= 3) {
      return {
        identificador: "ClienteFrequente",
        valor: ticket.custo * 0.20
      };
    }

    return { identificador: "nenhum", valor: 0 };
  }
}

module.exports = DescontoClienteFrequente;
