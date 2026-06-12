// Relatórios básicos pedidos no documento.
// Na Fase 1, eles funcionam em memória, sem CSV.
class RelatoriosGerenciais {
  constructor(cadastroClientes, registroService) {
    this.cadastroClientes = cadastroClientes;
    this.registroService = registroService;
  }

  totalArrecadadoPorPeriodo(inicio, fim, tipos = []) {
    return this.registroService.listarTickets()
      .filter((t) => t.saida && t.saida >= inicio && t.saida <= fim)
      .filter((t) => tipos.length === 0 || tipos.includes(t.tipoCliente))
      .reduce((total, t) => total + t.valorPago, 0);
  }

  situacaoCliente(id) {
    const cliente = this.cadastroClientes.buscarClientePorId(id);
    if (!cliente) throw new Error("Cliente não encontrado.");

    const veiculosEstacionados = Array.from(cliente.placas)
      .filter((placa) => this.registroService.buscarTicketAberto(placa));

    return {
      id: cliente.id,
      nome: cliente.nome,
      tipo: cliente.tipo,
      veiculosEstacionados,
      saldo: cliente.saldo ?? null,
      debito: cliente.debito ?? null,
      inadimplente: cliente.inadimplente ?? false
    };
  }

  registrosClienteCadastrado(id, inicio, fim) {
    const cliente = this.cadastroClientes.buscarClientePorId(id);
    if (!cliente) throw new Error("Cliente não encontrado.");

    return this.registroService.listarTickets().filter((t) => {
      return cliente.possuiPlaca(t.placa) && t.entrada >= inicio && t.entrada <= fim;
    });
  }

  registrosClienteAvulso(placa, inicio, fim) {
    return this.registroService.listarTickets().filter((t) => {
      return t.placa === placa.toUpperCase() &&
        t.tipoCliente === "Avulso" &&
        t.entrada >= inicio &&
        t.entrada <= fim;
    });
  }

  clientesImpedidos() {
    const bloqueados = this.cadastroClientes.listarBloqueados()
      .map((placa) => ({ tipo: "Avulso", placa }));

    const empresasInadimplentes = this.cadastroClientes.listarClientes()
      .filter((c) => c.tipo === "Empresa" && c.inadimplente)
      .map((c) => ({ tipo: "Empresa", id: c.id, nome: c.nome }));

    const estudantesNegativos = this.cadastroClientes.listarClientes()
      .filter((c) => c.tipo === "Estudante" && c.saldo < 0)
      .map((c) => ({ tipo: "Estudante", id: c.id, nome: c.nome, saldo: c.saldo }));

    return [...bloqueados, ...empresasInadimplentes, ...estudantesNegativos];
  }

  top10FrequentesAno(ano) {
    const contagem = new Map();

    for (const ticket of this.registroService.listarTickets()) {
      if (ticket.entrada.getFullYear() === ano) {
        const chave = ticket.placa;
        contagem.set(chave, (contagem.get(chave) || 0) + 1);
      }
    }

    return Array.from(contagem.entries())
      .map(([placa, quantidade]) => ({ placa, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 10);
  }
}

module.exports = RelatoriosGerenciais;
