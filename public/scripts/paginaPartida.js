const idDaPartida = document.URL.split("/")[4];
const formAdicionarJogador = document.querySelector("#formAdicionarJogador");

formAdicionarJogador.addEventListener("submit", async (e) => {
  e.preventDefault();
  await adicionarJogador();
});

const buscarPartida = async () => {
  return await fetch(`/dados/partida/${idDaPartida}`)
    .then((data) => data.json())
    .then((partida) => {
      document.title = partida.titulo;
      console.log(partida);
      const titulo = (document.querySelector("#titulo").innerHTML =
        partida.titulo);
      const local = (document.querySelector("#local").innerHTML =
        partida.local);
      const dataEvento = (document.querySelector("#dataDoEvento").innerHTML =
        partida.dataEvento);
      const horario = (document.querySelector("#horario").innerHTML =
        partida.horario);

      const confirmarPresencaButton = document.createElement("button");
      confirmarPresencaButton.innerText = "Confirmar presença";

      const listaJogadores = partida.jogadores;

      const listaDeJogadoresUl = document.querySelector("#listaDeJogadores");
      listaDeJogadoresUl.innerHTML = "";
      if (listaJogadores.length === 0) {
        const span = document.createElement("span");
        span.innerHTML = "Não há jogadores registrados";
        listaDeJogadoresUl.appendChild(span);
      } else {
        listaJogadores.map((jogador) => {
          const li = document.createElement("li");
          li.innerText = `
                        Nome: ${jogador.nome}
                        Telefone: ${jogador.telefone}
                        Presença: ${
                          jogador.presencaConfirmada
                            ? "Confirmada"
                            : "Não confirmada"
                        }
                    `;
          li.appendChild(confirmarPresencaButton);
          confirmarPresencaButton.addEventListener("click", () => {
            confirmarPresencaJogador(partida.id, jogador.id);
          });
          listaDeJogadoresUl.appendChild(li);
        });
      }
    });
};

async function adicionarJogador() {
  const nome = document.querySelector("#nome").value;
  const telefone = document.querySelector("#telefone").value;
  const jogador = {
    nome,
    telefone,
  };
  const data = await fetch(`/partida/${idDaPartida}/adicionarJogador`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jogador),
  })
    .then((res) => {
      if (res.ok) {
        buscarPartida();
        document.querySelector("#nome").value = "";
        document.querySelector("#telefone").value = "";
      }
    })
    .catch((e) => console.log(e.message));
  console.log(data);
}

async function confirmarPresencaJogador(idPartida, idJogador) {
  const data = await fetch(
    `/partida/${idPartida}/jogador/${idJogador}/confirmarPresenca`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        buscarPartida();
      }
    })
    .catch((e) => console.log(e.message));
  console.log(data);
}

window.onload = () => {
  buscarPartida();
};
