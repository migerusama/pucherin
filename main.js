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
        this.posiciones = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, "puchero": 0, 8: 0, 9: 0, 10: 0, 11: 0 }
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
var turno = 0
var winners = new Player(0, 0)

document.getElementById("tirarDado").addEventListener("click", lanzarDados)
document.getElementById("volverBtn").addEventListener("click", () => {
    document.getElementById("volver").classList.toggle("hidden")
    togglePlayers()
    logger.value = ""
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
    if (gamemode == "auto") {
        toggleModos()
        document.getElementById("volver").classList.toggle("hidden")
        do {
            turno++
            players.forEach(player => {
                log(`Turno: ${turno}`)
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
                    } else {
                        log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                        player.puntos += tablero.posiciones[dado]
                        tablero.posiciones[dado] = 0
                    }
                    if (tablero.isEmpty()) {
                        fin = true
                        log("Partida finalizada")
                    }
                }
                log(`Tablero: ${tablero.print()}`)
            })
        } while (!fin)
    } else if (gamemode == "manual") {
        toggleModos()
        document.getElementById("dadoBox").classList.toggle("hidden")
    }
}

function play() {
    lanzarDados()
}

function lanzarDados() {
    dados.forEach(dado => {
        dado.innerText = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
    })
}

function crearPlayers() {
    for (let i = 1; i <= numPlayers; i++) {
        players.push(new Player(i, Math.floor(50 / numPlayers)))
    }
}

function log(message) {
    logger.append(message + "\n")
}
