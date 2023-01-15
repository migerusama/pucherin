// Clase Jugador
class Player {
  puntos = 0;
  constructor(name, fichas) {
    this.name = name;
    this.fichas = fichas;
  }
  throwDice() {
    // Tirar los dados
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    return dice1 + dice2;
  }
}
var tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array para almacenar el tablero
var players = []; // Array para almacenar los jugadores
var currentPlayer; // Variable que almacena el índice del jugador actual
var p2Reached = false; // Comprueba si se ha llegado a la fase 2
var endGameReached = false; // Comprueba si se ha llegado a la fase 2
var diceSum = null; // Inicializa la variable de la suma de los dados
var sumFichas = 0; // Inicializa la variable de las fichas ganadas
var playingTurn = false; // Comprueba si se esta jugando un turno
let numPlayers = null; // Numero de Jugadores
let gameMode = null; // Modo de Juego

function startGame() {
  const totalFichas = 50;
  var fichasPorJugador = Math.floor(totalFichas / numPlayers);
  for (var i = 0; i < numPlayers; i++) {
    //Añadir al array un objeto de tipo Player con su nombre y el numero de fichas
    players.push(new Player("Jugador " + (i + 1), fichasPorJugador));
  }
  currentPlayer = 0;
  showTurn();
}
function showTurn() {
  console.log(`[${players[currentPlayer].name}]`);
  // Funcion que muestra el turno
  if (!p2Reached) {
    console.log(`Fichas : ${players[currentPlayer].fichas}`);
  }
  console.log(`Puntuación : ${players[currentPlayer].puntos}`);
  if (gameMode == "manual") {
    console.log(`Pulse [ESPACIO] para tirar los dados`);
    playingTurn = true;
  } else if (gameMode == "auto") {
    playTurn();
  }
}
function playTurn() {
  diceSum = null;
  diceSum = players[currentPlayer].throwDice();
  if (!p2Reached) play();
  else playPhase2();
}
function play() {
  console.log(`El ${players[currentPlayer].name} ha sacado un ${diceSum}`);
  //Validar si el jugador ha sacado un 12
  if (diceSum == 12) {
    console.log(
      `El ${players[currentPlayer].name} ha sacado un 12 y se lleva ${tablero[5]} fichas del puchero !`
    );
    console.log("---------------------");
    players[currentPlayer].fichas--;
    players[currentPlayer].puntos += tablero[5];
    tablero[5] = 0;
  }
  //Validar si el jugador a sacado un 7
  else if (diceSum == 7) {
    console.log(
      `El ${players[currentPlayer].name} ha sacado un 7 y ha depositado una ficha en el puchero`
    );
    console.log("---------------------");
    players[currentPlayer].fichas--;
    tablero[5]++;
  }
  // Validar cantidad de fichas en la casilla
  else if (tablero[diceSum - 2] == diceSum - 1) {
    console.log(
      `El ${players[currentPlayer].name} ha completado la casilla ${diceSum} y se lleva ${diceSum} fichas `
    );
    players[currentPlayer].fichas--;
    players[currentPlayer].puntos += diceSum;
    tablero[diceSum - 2] = 0;
  } else {
    console.log(
      `El ${players[currentPlayer].name} ha de positado una ficha en la casilla ${diceSum} `
    );
    players[currentPlayer].fichas--;
    tablero[diceSum - 2]++;
    console.log(tablero);
    console.log("---------------------");
  }
  // Comprobar si quedan mas fichas y pasar de turno
  if (!checkFichas()) {
    currentPlayer == players.length - 1 ? (currentPlayer = 0) : currentPlayer++;
    showTurn();
  } else {
    currentPlayer = 0;
    p2Reached = true;
    console.log("Ya no quedan mas fichas! Empieza la fase final.");
    ("---------------------");
    showTurn();
  }
}
function playPhase2() {
  p2Reached = true;
  console.log(`El ${players[currentPlayer].name} ha sacado un ${diceSum}`);
  // Comprobar si el jugador ha sacado un 12
  if (diceSum == 12) {
    for (var i = 0; i < tablero.length; i++) {
      players[currentPlayer].puntos += tablero[i];
      sumFichas += tablero[i];
      tablero[i] = 0;
    }
    console.log(
      `El ${players[currentPlayer].name} ha sacado un 12 y se lleva el contenido de todo el tablero... ${sumFichas} fichas!`
    );
    console.log("---------------------");
    // Si no ha sacado un 12, coger el contenido de la casilla
  } else {
    players[currentPlayer].puntos += tablero[diceSum - 2];
    console.log(
      `El ${
        players[currentPlayer].name
      } ha sacado un ${diceSum} y se ha llevado ${tablero[diceSum - 2]} fichas`
    );
    console.log(
      `El ${players[currentPlayer].name} tiene ${players[currentPlayer].puntos}`
    );
    tablero[diceSum - 2] = 0;
    console.log(tablero);
    console.log("---------------------");
  }
  if (!checkTableroVacio()) {
    currentPlayer == players.length - 1 ? (currentPlayer = 0) : currentPlayer++;
    showTurn();
  } else {
    endGame();
  }
}
function getGameMode() {
  gameMode = prompt("Ingresa el modo de juego [manual/auto]");
  gameMode != "manual" && gameMode != "auto" ? getGameMode() : getNumPlayers();
}
function getNumPlayers() {
  numPlayers = prompt("Ingresa un numero de Jugadores válido [2-5]");
  numPlayers != 2 && numPlayers != 3 && numPlayers != 4 && numPlayers && 5
    ? getNumPlayers()
    : startGame();
}
function checkFichas() {
  return players[players.length - 1].fichas == 0 ? true : false;
}
function checkTableroVacio() {
  var sum = 0;
  for (var i = 0; i < tablero.length; i++) {
    sum += tablero[i];
  }
  return sum == 0 ? true : false;
}
function endGame() {
  playingTurn = false;
  endGameReached = true;

  //Encontrar al jugador ganador
  var ganador;
  var maxPuntos = 0;
  for (var i = 0; i < players.length; i++) {
    if (players[i].puntos > maxPuntos) {
      ganador = players[i];
      maxPuntos = players[i].puntos;
    }
  }
  // Mostrar un mensaje con el nombre del ganador
  console.log(
    `El ganador es el ${ganador.name} con ${ganador.puntos} fichas! El juego a terminado.`
  );

  console.log("Pulsa la tecla [R] para reiniciar la partida");
}
function reset() {
  players.length = 0;
  p2Reached = false;
  endGameReached = false;
  sumFichas = 0;
  console.clear();
  getGameMode();
}
window.addEventListener("keyup", function (event) {
  if (playingTurn == true) {
    if (!endGameReached && event.code === "Space" && gameMode === "manual") {
      playingTurn = false;
      playTurn();
    }
  }
});
window.addEventListener("keyup", function (event) {
  if (endGameReached == true && event.code === "KeyR") {
    reset();
  }
});
getGameMode();
