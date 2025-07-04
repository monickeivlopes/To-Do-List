import "./form.css";
import Filter from "./filter";
import { useState } from "react";

export default function Form() {
  const [tarefa, setTarefa] = useState({
    nome: "",
    status: "",
    prioridade: "",
    data: "",
  });

  const [tarefas, setTarefas] = useState([]);

  const adicionaTarefa = (e) => {
    e.preventDefault();
    if (!tarefa.nome || !tarefa.status || !tarefa.prioridade || !tarefa.data) {
      return;
    }

    setTarefas([...tarefas, tarefa]);
    setTarefa({ nome: "", status: "", prioridade: "", data: "" });
  };

  const concluirTarefa = (nome) => {
    const tarefasAtualizadas = tarefas.map((t) =>
      t.nome === nome ? { ...t, status: "Realizada" } : t
    );
    setTarefas(tarefasAtualizadas);
  };

  const reabrirTarefa = (nome) => {
    const tarefasAtualizadas = tarefas.map((t) =>
      t.nome === nome ? { ...t, status: "Não realizada" } : t
    );
    setTarefas(tarefasAtualizadas);
  };

  const excluirTarefa = (nome) => {
    const novasTarefas = tarefas.filter((t) => t.nome !== nome);
    setTarefas(novasTarefas);
  };

  return (
    <>
      <h1>Agenda Pessoal</h1>

      <Filter tarefas={tarefas} setTarefas={setTarefas} />

      <form onSubmit={adicionaTarefa}>
        <input
          type="text"
          placeholder="Digite o nome da tarefa"
          value={tarefa.nome}
          onChange={(e) => setTarefa({ ...tarefa, nome: e.target.value })}
        />

        <select
          value={tarefa.status}
          onChange={(e) => setTarefa({ ...tarefa, status: e.target.value })}
        >
          <option value="">Selecione o status</option>
          <option value="Não realizada">Não realizada</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Realizada">Realizada</option>
        </select>

        <select
          value={tarefa.prioridade}
          onChange={(e) =>
            setTarefa({ ...tarefa, prioridade: e.target.value })
          }
        >
          <option value="">Escolha a prioridade</option>
          <option value="Alta">Alta</option>
          <option value="Media">Média</option>
          <option value="Baixa">Baixa</option>
        </select>

        <input
          type="date"
          value={tarefa.data}
          onChange={(e) => setTarefa({ ...tarefa, data: e.target.value })}
        />

        <button type="submit">Adicionar Tarefa</button>
      </form>

      <h2>Minhas Tarefas</h2>

      {tarefas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Data</th>
              <th colSpan={2}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.nome}>
                <td>{tarefa.nome}</td>
                <td>{tarefa.status}</td>
                <td>{tarefa.prioridade}</td>
                <td>{tarefa.data}</td>
                <td>
                  {tarefa.status === "Realizada" ? (
                    <button
                      className="botao-excluir"
                      onClick={() => reabrirTarefa(tarefa.nome)}
                    >
                      Reabrir
                    </button>
                  ) : (
                    <button
                      className="botao-concluir"
                      onClick={() => concluirTarefa(tarefa.nome)}
                    >
                      Concluir
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="botao-excluir"
                    onClick={() => excluirTarefa(tarefa.nome)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "20px" }}>Nenhuma tarefa cadastrada.</p>
      )}
    </>
  );
}
