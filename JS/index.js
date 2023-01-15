class Player {
    id
    num_fichas
    puntos

    constructor(id, fichas) {
        this.id = id
        this.num_fichas = fichas
        this.puntos = 0
    }
}

class Tablero {
    posiciones
    constructor() {
        this.posiciones = { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, "puchero": 0, 8: 0, 9: 0, 10: 0, 11: 0 }
    }

    isEmpty() {
        for (var key in this.posiciones) {
            if (this.posiciones[key] != 0) return false
        }
        return true
    }

    print() {
        var tablero = ""
        for (var key in this.posiciones) {
            tablero += `${this.posiciones[key]}, `
        }
        tablero = tablero.trim().substring(0, tablero.length - 2)
        return tablero
    }
}

var logger = document.getElementById("logger")
var playersBtn = document.getElementsByName("players")
var modesBtn = document.getElementsByName("modes")
var dados = document.getElementsByName("dados")
var numPlayers = 0
var gamemode = ""
var players = []
var tablero = new Tablero()
var fin = false
var noFichas = false
var playerTurn = 0

/* CREACIÓN DEL TABLERO */

var container = document.querySelector(".box")
const casillas = 9

var puchero = document.createElement('canvas')
puchero.classList.add('puchero')
puchero.width = 120
puchero.height = 120
container.appendChild(puchero)
pintarPuchero(puchero)

for (var i = 0; i < casillas; i++) {
    var canvas = document.createElement('canvas')
    canvas.classList.add('casilla')
    canvas.width = 120
    canvas.height = 120
    container.appendChild(canvas)
}

var canvases = document.querySelectorAll('.casilla')

for (var i = 0; i < canvases.length; i++) {
    var ctx = canvases[i].getContext('2d')
    ctx.beginPath()
    canvases[i].style.left = (Math.cos(2 * Math.PI * i / casillas) * 400 + 450 - 25) / window.outerHeight * 100 + '%'
    canvases[i].style.top = (Math.sin(2 * Math.PI * i / casillas) * 400 + 450 - 25) / window.outerHeight * 100 + '%'
    if (i > 4) pintarCasilla(canvases[i], i + 3)
    else pintarCasilla(canvases[i], i + 2)
}

/* JUEGO */

document.getElementById("logger").scrollTop = document.getElementById("logger").scrollHeight
document.getElementById("tirarDado").addEventListener("click", play)
document.getElementById("volverBtn").addEventListener("click", () => {
    reset()
    document.getElementById("volverBtn").classList.toggle("hidden")
    togglePlayers()
    logger.innerText = ""

})

dados.forEach(dado => {
    dado.innerText = 0
})

playersBtn.forEach(element => {
    element.addEventListener("click", (event) => {
        numPlayers = event.target.value
        togglePlayers()
        toggleModos()
    })
})

modesBtn.forEach(element => {
    element.addEventListener("click", (event) => {
        gamemode = event.target.value
        startGame()
    })
})

function pintarPuchero(canvas) {
    var ctx = canvas.getContext('2d')
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 3 * Math.PI)
    ctx.fillStyle = '#be4d25'
    ctx.fill()
    for (var i = 0; i < 4; i++) {
        var x = Math.cos(2 * Math.PI * i / 4) * 35 + canvas.width / 2
        var y = Math.sin(2 * Math.PI * i / 4) * 35 + canvas.height / 2
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, 2 * Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
    }
    ctx.fillStyle = 'white'
    ctx.font = '24px sans-serif'
    x = canvas.width / 2 - ctx.measureText(7).width / 2
    y = canvas.height / 2 + 10
    ctx.fillText(7, x, y)
}

function pintarCasilla(canvas, fichas, num) {
    var ctx = canvas.getContext('2d');
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#2596be';
    ctx.fill();
    for (var i = 0; i < fichas; i++) {
        var x = Math.cos(2 * Math.PI * i / fichas) * 35 + canvas.width / 2;
        var y = Math.sin(2 * Math.PI * i / fichas) * 35 + canvas.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, 2 * Math.PI);
        if (i < num) ctx.fillStyle = '#be4d25'
        else ctx.fillStyle = 'white'
        ctx.fill();
    }
    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    x = canvas.width / 2 - ctx.measureText(fichas).width / 2;
    y = canvas.height / 2 + 10;
    ctx.fillText(fichas, x, y);
}

function togglePlayers() {
    playersBtn.forEach(element => {
        element.classList.toggle("hidden")
    })
}

function toggleModos() {
    modesBtn.forEach(element => {
        element.classList.toggle("hidden")
    })
}

function startGame() {
    crearPlayers()
    var dado = 0
    if (gamemode == "manual") {
        toggleModos()
        document.getElementById("dadoBox").classList.toggle("hidden")
    } else if (gamemode == "auto") {
        toggleModos()
        document.getElementById("volverBtn").classList.toggle("hidden")
        do {
            players.forEach(player => {
                log(`Jugador: ${player.id}`)
                log(`Número de fichas: ${player.num_fichas}`)
                log("Lanzando dados...")
                dado = Math.floor(Math.random() * (6 - 2 + 1) + 2)
                log(`Número: ${dado}`)
                if (player.num_fichas > 0 && !noFichas) {
                    if (dado == 12) {
                        log(`Jugador ${player.id} gana ${tablero.posiciones["puchero"]} puntos`)
                        player.puntos += tablero.posiciones["puchero"]
                        tablero.posiciones["puchero"] = 0
                    } else if (dado == 7) {
                        log("Añadiendo ficha al puchero")
                        tablero.posiciones["puchero"]++
                    } else {
                        player.num_fichas--
                        tablero.posiciones[dado]++
                        if (tablero.posiciones[dado] == dado) {
                            log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                            player.puntos += tablero.posiciones[dado]
                            tablero.posiciones[dado] = 0
                        }
                        if (dado > 7) pintarCasilla(canvases[dado - 3], dado, tablero.posiciones[dado])
                        else pintarCasilla(canvases[dado - 2], dado, tablero.posiciones[dado])
                    }
                } else {
                    noFichas = true
                    if (tablero.isEmpty()) {
                        fin = true
                        log("Partida finalizada")
                    } else {
                        if (dado == 7) {
                            log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                            player.puntos += tablero.posiciones["puchero"]
                            tablero.posiciones["puchero"] = 0
                        } else if (dado == 12) {
                            log(`Jugador ${player.id} gana todos los puntos del tablero`)
                            for (const key in tablero.posiciones) {
                                player.puntos += tablero.posiciones[key]
                                tablero.posiciones[key] = 0
                            }
                            for (let i = 2; i < 12; i++) {
                                if (i > 7) pintarCasilla(canvases[i - 3], i, tablero.posiciones[i])
                                else if (i == 7) {
                                    pintarCasilla(canvases[i - 2], i + 1, tablero.posiciones[i])
                                } else pintarCasilla(canvases[i - 2], i, tablero.posiciones[i])
                            }
                        } else {
                            log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                            player.puntos += tablero.posiciones[dado]
                            tablero.posiciones[dado] = 0
                            if (dado > 7) pintarCasilla(canvases[dado - 3], dado, tablero.posiciones[dado])
                            else pintarCasilla(canvases[dado - 2], dado, tablero.posiciones[dado])
                        }
                    }
                }
                log(`Tablero: ${tablero.print()}`)
                log(`-----------------------------------------`)
            })
        } while (!fin)
        players = players.sort((a, b) => b.puntos - a.puntos)
        log(`El ganador es el jugador ${players[0].id} con ${players[0].puntos} puntos`)
    }
}

function play() {
    if (!fin) {
        let dado = lanzarDados()
        let player = players[playerTurn]
        log(`Jugador: ${player.id}`)
        log(`Número de fichas: ${player.num_fichas}`)
        log("Lanzando dados...")
        log(`Número: ${dado}`)
        if (player.num_fichas > 0 && !noFichas) {
            if (dado == 12) {
                log(`Jugador ${player.id} gana ${tablero.posiciones["puchero"]} puntos`)
                player.puntos += tablero.posiciones["puchero"]
                tablero.posiciones["puchero"] = 0
            } else if (dado == 7) {
                log("Añadiendo ficha al puchero")
                tablero.posiciones["puchero"]++
            } else {
                player.num_fichas--
                tablero.posiciones[dado]++
                if (tablero.posiciones[dado] == dado) {
                    log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                    player.puntos += tablero.posiciones[dado]
                    tablero.posiciones[dado] = 0
                }
                if (dado > 7) pintarCasilla(canvases[dado - 3], dado, tablero.posiciones[dado])
                else pintarCasilla(canvases[dado - 2], dado, tablero.posiciones[dado])
            }
        } else {
            noFichas = true
            if (dado == 7) {
                log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                player.puntos += tablero.posiciones["puchero"]
                tablero.posiciones["puchero"] = 0
            } else if (dado == 12) {
                log(`Jugador ${player.id} gana todos los puntos del tablero`)
                for (const key in tablero.posiciones) {
                    player.puntos += tablero.posiciones[key]
                    tablero.posiciones[key] = 0
                }
                for (let i = 2; i < 12; i++) {
                    if (i > 7) pintarCasilla(canvases[i - 3], i, tablero.posiciones[i])
                    else if (i == 7) {
                        pintarCasilla(canvases[i - 2], i + 1, tablero.posiciones[i])
                    } else pintarCasilla(canvases[i - 2], i, tablero.posiciones[i])
                }
            } else {
                log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                player.puntos += tablero.posiciones[dado]
                tablero.posiciones[dado] = 0
                if (dado > 7) pintarCasilla(canvases[dado - 3], dado, tablero.posiciones[dado])
                else pintarCasilla(canvases[dado - 2], dado, tablero.posiciones[dado])
            }
            if (tablero.isEmpty()) {
                fin = true
                log("Partida finalizada")
            }
        }
        log(`Tablero: ${tablero.print()}`)
        log(`-----------------------------------------`)
        playerTurn++
        if (playerTurn == numPlayers) playerTurn = 0
    } else {
        players = players.sort((a, b) => b.puntos - a.puntos)
        log(`El ganador es el jugador ${players[0].id} con ${players[0].puntos} puntos`)
        document.getElementById("volverBtn").classList.toggle("hidden")
        document.getElementById("dadoBox").classList.toggle("hidden")
    }
}

function lanzarDados() {
    var num = 0
    dados.forEach(dado => {
        num += dado.innerText = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    })
    return num
}

function crearPlayers() {
    players = []
    for (let i = 1; i <= numPlayers; i++) {
        players.push(new Player(i, Math.floor(50 / numPlayers)))
    }
}

function log(message) {
    logger.append(message + "\n")
    logger.scrollTop = logger.scrollHeight;
}

function reset() {
    numPlayers = 0
    gamemode = ""
    players = []
    tablero = new Tablero()
    fin = false
    noFichas = false
    playerTurn = 0
}