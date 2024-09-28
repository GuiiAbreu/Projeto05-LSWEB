# Projeto Linguagem de Scripts para WEB -  Assincronismo + NodeJS + Express
O objetivo deste projeto é criar uma aplicação que facilite a organização e marcação de partidas de futebol entre amigos. Com as seguintes funcionalidades:
- Criar partidas. Cada partida deve ter um título, um local, data e horário.
- Criar lista de presença dos jogadores. Após criar a partida, deve ser permitido adicionar/remover uma lista com os participantes e um telefone para contato.
- Acompanhar a presença. Essa funcionalidade será usada para "confirmar" quem vai estar presente no dia da partida marcada. Deverá ser apresentada a lista dos jogadores com uma opção para confirmar sua presença.
- Excluir partida. Deve ser permitido excluir a partida.
  
Para esse projeto foi construído os seguintes módulos:
+ Frontend utilizando HTML, CSS e Javascript para controlar os eventos da tela e realizar as requisições para o backend para salvar e recuperar os dados.
+ Backend utilizando NodeJS + Express.
Os dados da aplicação são guardados em um arquivo do tipo JSON. Utilizando as funções nativas do NodeJS para ler (readFile) e escrever arquivos (writeFile)
