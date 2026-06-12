const Cliente = require("./Cliente");

// Professor: pode cadastrar até 2 veículos, mas só 1 pode ficar estacionado por vez.
// A cobrança é gratuita.
class Professor extends Cliente {
  adicionarPlaca(placa) {
    if (this._placas.size >= 2 && !this.possuiPlaca(placa)) {
      throw new Error("Professor pode cadastrar no máximo duas placas.");
    }
    super.adicionarPlaca(placa);
  }

  podeEntrar(registroService) {
    const algumVeiculoEstacionado = registroService.clientePossuiTicketAberto(this);

    if (algumVeiculoEstacionado) {
      return { permitido: false, motivo: "Professor já possui um veículo estacionado." };
    }

    return { permitido: true, motivo: "Entrada permitida para professor." };
  }

  calcularCusto(ticket) {
    return 0;
  }
}

module.exports = Professor;
