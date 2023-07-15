const formEnviarPartida = document.querySelector("#formEnviarPartida");

formEnviarPartida.addEventListener("submit", async (e) => {
  e.preventDefault();
  await exibirListaDePartidas();
  await criarPartida();
});

async function exibirListaDePartidas() {
  const listaDePartidas = document.querySelector("#listaDePartidas");
  listaDePartidas.innerHTML = "";
  const data = await carregarDadosDaAPI();
  data.map((dado) => {
    const li = document.createElement("li");
    const verDetalhes = document.createElement("button");
    verDetalhes.innerText = "Detalhes";
    verDetalhes.addEventListener("click", () => {
      window.location.href = `/partida/${dado.id}`;
    });
    const excluirPartidaButton = document.createElement("button");
    excluirPartidaButton.innerText = "Excluir";
    excluirPartidaButton.addEventListener("click", async () => {
      await excluirPartida(dado.id);
    });
    li.innerHTML = `
            <strong>Título:</strong> ${dado.titulo}
        `;
    li.style.color = "#FFF";
    li.appendChild(verDetalhes);
    li.appendChild(excluirPartidaButton);
    listaDePartidas.appendChild(li);
  });
}

async function carregarDadosDaAPI() {
  try {
    const response = await fetch("/partidas")
      .then((data) => data.json())
      .catch((e) => {
        console.log(`Ocorreu um erro ao obter os dados da API: ${e.message}`);
      });
    return response;
  } catch (e) {
    console.log(`Ocorreu um erro: ${e.message}`);
  }
}

async function criarPartida() {
  let titulo = document.querySelector("#inputTitulo").value;
  let local = document.querySelector("#inputLocal").value;
  let dataEvento = document.querySelector("#inputData").value;
  let horario = document.querySelector("#inputHorario").value;

  const partida = {
    titulo,
    local,
    dataEvento,
    horario,
  };

  return await fetch("/partida", {
    method: "POST",
    body: JSON.stringify(partida),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      exibirListaDePartidas();
      document.querySelector("#inputLocal").value = "";
      document.querySelector("#inputLocal").value = "";
      document.querySelector("#inputData").value = "";
      document.querySelector("#inputHorario").value = "";
    }
  });
}

async function excluirPartida(id) {
  const response = await fetch(`http://localhost:3000/excluir/${id}`, {
    method: "POST",
  })
    .then((res) => {
      if(res.ok) {
        exibirListaDePartidas();
      };
    })
    .catch((e) => console.log(e.message));
}

window.onload = () => {
  exibirListaDePartidas();
};
