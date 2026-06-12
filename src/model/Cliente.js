// Classe base para os clientes cadastrados.
// ELI5: pense nela como um "molde geral" de cliente.
// Estudante, Professor e Empresa vão reaproveitar esse molde.
class Cliente {
  constructor(id, nome) {
    if (new.target === Cliente) {
      throw new Error("Cliente é uma classe abstrata e não deve ser instanciada diretamente.");
    }

    this._id = id;       // CPF ou CNPJ
    this._nome = nome;   // Nome do cliente
    this._placas = new Set(); // Set evita placa duplicada automaticamente.
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get placas() {
    return this._placas;
  }

  get tipo() {
    return this.constructor.name;
  }

  adicionarPlaca(placa) {
    this._placas.add(placa.toUpperCase());
  }

  removerPlaca(placa) {
    this._placas.delete(placa.toUpperCase());
  }

  possuiPlaca(placa) {
    return this._placas.has(placa.toUpperCase());
  }

  // Método polimórfico.
  // Cada filho decide sua própria regra de entrada.
  podeEntrar(registroService) {
    return { permitido: true, motivo: "Entrada permitida." };
  }

  // Método polimórfico.
  // Cada filho calcula seu custo de forma diferente.
  calcularCusto(ticket) {
    throw new Error("Cada tipo de cliente deve implementar seu próprio cálculo de custo.");
  }
}

module.exports = Cliente;
