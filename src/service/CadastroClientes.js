// Classe responsável pelo cadastro dos clientes e placas.
// Usa Map para achar clientes rápido.
// Usa Set para bloquear placas avulsas inadimplentes.
class CadastroClientes {
  constructor() {
    this.clientes = new Map();       // id CPF/CNPJ -> cliente
    this.placaParaCliente = new Map(); // placa -> cliente
    this.placasBloqueadas = new Set(); // placas avulsas bloqueadas
  }

  cadastrarCliente(cliente) {
    if (this.clientes.has(cliente.id)) {
      throw new Error("Já existe cliente cadastrado com este CPF/CNPJ.");
    }

    this.clientes.set(cliente.id, cliente);

    for (const placa of cliente.placas) {
      this._vincularPlaca(cliente, placa);
    }
  }

  adicionarPlacaCliente(id, placa) {
    const cliente = this.buscarClientePorId(id);
    if (!cliente) throw new Error("Cliente não encontrado.");

    if (this.placaParaCliente.has(placa.toUpperCase())) {
      throw new Error("Esta placa já pertence a um cliente cadastrado.");
    }

    cliente.adicionarPlaca(placa);
    this._vincularPlaca(cliente, placa);
  }

  removerPlacaCliente(id, placa) {
    const cliente = this.buscarClientePorId(id);
    if (!cliente) throw new Error("Cliente não encontrado.");

    cliente.removerPlaca(placa);
    this.placaParaCliente.delete(placa.toUpperCase());
  }

  buscarClientePorId(id) {
    return this.clientes.get(id);
  }

  buscarClientePorPlaca(placa) {
    return this.placaParaCliente.get(placa.toUpperCase()) || null;
  }

  bloquearPlacaAvulsa(placa) {
    this.placasBloqueadas.add(placa.toUpperCase());
  }

  placaEstaBloqueada(placa) {
    return this.placasBloqueadas.has(placa.toUpperCase());
  }

  listarClientes() {
    return Array.from(this.clientes.values());
  }

  listarBloqueados() {
    return Array.from(this.placasBloqueadas);
  }

  _vincularPlaca(cliente, placa) {
    const placaMaiuscula = placa.toUpperCase();

    if (this.placaParaCliente.has(placaMaiuscula)) {
      throw new Error("Placa duplicada não permitida.");
    }

    this.placaParaCliente.set(placaMaiuscula, cliente);
  }
}

module.exports = CadastroClientes;
