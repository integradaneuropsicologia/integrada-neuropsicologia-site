"use client";

import { useMemo, useState } from "react";

type ActionTask = {
  title: string;
  context: string;
  correctOrder: string[];
  startingOrder: string[];
};

const tasks: ActionTask[] = [
  {
    title: "Entrar em uma conta com código por e-mail",
    context: "Ordene as etapas de um acesso em que cada tela só aparece após a anterior.",
    correctOrder: [
      "Abrir a página de acesso da conta",
      "Digitar o endereço de e-mail cadastrado",
      "Solicitar o envio do código de acesso",
      "Abrir a caixa de entrada e localizar a nova mensagem",
      "Copiar o código recebido",
      "Voltar à página de acesso e inserir o código",
      "Confirmar para entrar na conta",
    ],
    startingOrder: [
      "Copiar o código recebido",
      "Abrir a página de acesso da conta",
      "Confirmar para entrar na conta",
      "Digitar o endereço de e-mail cadastrado",
      "Voltar à página de acesso e inserir o código",
      "Solicitar o envio do código de acesso",
      "Abrir a caixa de entrada e localizar a nova mensagem",
    ],
  },
  {
    title: "Redefinir uma senha esquecida",
    context: "Organize o fluxo completo, desde a tela de entrada até o uso da nova senha.",
    correctOrder: [
      "Abrir a tela de entrada do serviço",
      "Selecionar a opção “Esqueci minha senha”",
      "Informar o e-mail da conta e solicitar a recuperação",
      "Abrir a mensagem de recuperação recebida",
      "Acessar o link para criar uma nova senha",
      "Digitar e confirmar a nova senha",
      "Voltar à tela de entrada e usar a nova senha",
    ],
    startingOrder: [
      "Digitar e confirmar a nova senha",
      "Abrir a mensagem de recuperação recebida",
      "Abrir a tela de entrada do serviço",
      "Voltar à tela de entrada e usar a nova senha",
      "Informar o e-mail da conta e solicitar a recuperação",
      "Acessar o link para criar uma nova senha",
      "Selecionar a opção “Esqueci minha senha”",
    ],
  },
  {
    title: "Extrair um arquivo compactado",
    context: "Coloque em ordem as ações necessárias para extrair e abrir um arquivo recebido.",
    correctOrder: [
      "Localizar o arquivo compactado no computador",
      "Selecionar o comando para extrair o conteúdo",
      "Escolher a pasta em que os arquivos serão colocados",
      "Confirmar a extração e aguardar o término",
      "Abrir a pasta criada pela extração",
      "Abrir o arquivo desejado dentro da pasta",
    ],
    startingOrder: [
      "Abrir o arquivo desejado dentro da pasta",
      "Escolher a pasta em que os arquivos serão colocados",
      "Localizar o arquivo compactado no computador",
      "Abrir a pasta criada pela extração",
      "Selecionar o comando para extrair o conteúdo",
      "Confirmar a extração e aguardar o término",
    ],
  },
  {
    title: "Atualizar um aplicativo pela loja",
    context: "Ordene um processo em que cada comando depende da conclusão da etapa anterior.",
    correctOrder: [
      "Abrir a loja de aplicativos do dispositivo",
      "Pesquisar pelo aplicativo que será atualizado",
      "Abrir a página do aplicativo encontrado",
      "Selecionar o botão de atualização",
      "Aguardar o download e a instalação terminarem",
      "Abrir o aplicativo atualizado",
    ],
    startingOrder: [
      "Selecionar o botão de atualização",
      "Abrir o aplicativo atualizado",
      "Pesquisar pelo aplicativo que será atualizado",
      "Aguardar o download e a instalação terminarem",
      "Abrir a loja de aplicativos do dispositivo",
      "Abrir a página do aplicativo encontrado",
    ],
  },
];

function isSameOrder(first: string[], second: string[]) {
  return first.every((item, index) => item === second[index]);
}

export function ActionOrderActivity() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [order, setOrder] = useState(() => [...tasks[0].startingOrder]);
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [completedRounds, setCompletedRounds] = useState(0);
  const [feedback, setFeedback] = useState(
    "Use os controles para mover cada etapa e formar uma sequência coerente.",
  );

  const task = tasks[taskIndex];
  const correctPositions = useMemo(
    () => order.filter((item, index) => item === task.correctOrder[index]).length,
    [order, task.correctOrder],
  );

  function moveItem(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= order.length || complete) return;
    const next = [...order];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    setOrder(next);
    setChecked(false);
    setFeedback("Ordem atualizada. Continue organizando ou confira sua resposta.");
  }

  function checkOrder() {
    if (complete) return;
    const nextAttempts = attempts + 1;
    const solved = isSameOrder(order, task.correctOrder);
    setAttempts(nextAttempts);
    setChecked(true);

    if (solved) {
      const earned = Math.max(40, 140 - (nextAttempts - 1) * 25);
      setComplete(true);
      setScore((value) => value + earned);
      setCompletedRounds((value) => value + 1);
      setFeedback(`Sequência correta. Você ganhou ${earned} pontos por planejamento e revisão.`);
    } else {
      setFeedback(
        `${correctPositions} de ${order.length} etapas estão na posição correta. Reavalie as dependências entre as ações.`,
      );
    }
  }

  function loadTask(index: number, resetScore = false) {
    setTaskIndex(index);
    setOrder([...tasks[index].startingOrder]);
    setAttempts(0);
    setChecked(false);
    setComplete(false);
    setRevealed(false);
    if (resetScore) {
      setScore(0);
      setCompletedRounds(0);
    }
    setFeedback("Nova situação carregada. Identifique o que precisa acontecer primeiro.");
  }

  function showSolution() {
    setOrder([...task.correctOrder]);
    setChecked(true);
    setComplete(true);
    setRevealed(true);
    setFeedback("Solução exibida para estudo. Leia a sequência e tente uma nova situação sem ajuda.");
  }

  return (
    <section className="exercise-game order-game" aria-labelledby="order-title">
      <div className="game-toolbar">
        <div>
          <p className="eyebrow">Sequenciamento e planejamento cotidiano</p>
          <h2 id="order-title">Ordem das Ações</h2>
          <p>
            Reorganize as etapas com os botões de subir e descer. Depois, confira
            se cada ação está na posição adequada.
          </p>
        </div>
        <div className="game-control">
          <button
            type="button"
            className="game-primary"
            onClick={() => loadTask((taskIndex + 1) % tasks.length)}
          >
            Nova rodada
          </button>
        </div>
      </div>

      <div className="game-stats" aria-label="Desempenho da sessão">
        <div className="game-stat"><span>Rodada</span><strong>{taskIndex + 1}/{tasks.length}</strong></div>
        <div className="game-stat"><span>Tentativas</span><strong>{attempts}</strong></div>
        <div className="game-stat"><span>Concluídas</span><strong>{completedRounds}</strong></div>
        <div className="game-stat"><span>Pontos</span><strong>{score}</strong></div>
      </div>

      <div className="game-board order-board">
        <div className="order-scenario">
          <span>Situação</span>
          <h3>{task.title}</h3>
          <p>{task.context}</p>
        </div>

        <ol className="order-list" aria-label="Etapas para ordenar">
          {order.map((item, index) => {
            const isCorrect = checked && item === task.correctOrder[index];
            return (
              <li className={isCorrect ? "is-correct" : checked ? "is-review" : ""} key={item}>
                <span className="order-position" aria-hidden="true">{index + 1}</span>
                <span className="order-text">{item}</span>
                <span className="order-controls">
                  <button
                    type="button"
                    className="game-secondary"
                    aria-label={`Mover “${item}” para cima`}
                    disabled={index === 0 || complete}
                    onClick={() => moveItem(index, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="game-secondary"
                    aria-label={`Mover “${item}” para baixo`}
                    disabled={index === order.length - 1 || complete}
                    onClick={() => moveItem(index, 1)}
                  >
                    ↓
                  </button>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className={`game-feedback${complete && !revealed ? " is-success" : ""}`} aria-live="polite">
        {feedback}
      </p>

      <div className="game-control">
        <button type="button" className="game-secondary" onClick={() => loadTask(taskIndex)}>
          Reiniciar rodada
        </button>
        {attempts >= 3 && !complete ? (
          <button type="button" className="game-secondary" onClick={showSolution}>
            Ver solução
          </button>
        ) : null}
        <button type="button" className="game-primary" onClick={checkOrder} disabled={complete}>
          Conferir ordem
        </button>
        <button type="button" className="game-secondary" onClick={() => loadTask(0, true)}>
          Reiniciar sessão
        </button>
      </div>
    </section>
  );
}
