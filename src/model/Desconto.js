// Classe base para descontos.
// Isso facilita criar novos descontos no futuro sem bagunçar o código principal.
class Desconto {
  aplicar(ticket, todosOsTickets) {
    return {
      identificador: "nenhum",
      valor: 0
    };
  }
}

module.exports = Desconto;
