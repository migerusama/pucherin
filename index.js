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

var players = []
var tablero = new Tablero()
var fin = false
var noFichas = false
var turno = 0
var winners = new Player(0, 0)

do {
    var numPlayers = Number(prompt("Numeros de jugadores: "))
} while (!Number.isInteger(numPlayers) && numPlayers > 0 && numPlayers < 6)

for (let i = 1; i <= numPlayers; i++) {
    players.push(new Player(i, Math.floor(50 / numPlayers)))
}

do {
    turno++
    players.forEach(player => {
        console.log(`-----------------`)
        console.log(`Turno: ${turno}`)
        console.log(`Jugador: ${player.id}`)
        console.log(`Número de fichas: ${player.num_fichas}`)
        console.log("Lanzando dados...")
        dado = Math.floor(Math.random() * (12 - 2 + 1) + 2)
        console.log(`Número: ${dado}`)
        if (player.num_fichas > 0 && !noFichas) {
            if (dado == 12) {
                console.log(`Jugador ${player.id} gana ${tablero.posiciones["puchero"]} puntos`)
                player.puntos += tablero.posiciones["puchero"]
                tablero.posiciones["puchero"] = 0
            } else if (dado == 7) {
                console.log("Añadiendo ficha al puchero")
                tablero.posiciones["puchero"]++
            } else {
                player.num_fichas--
                tablero.posiciones[dado]++
                if (tablero.posiciones[dado] == dado) {
                    console.log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                    player.puntos += tablero.posiciones[dado]
                    tablero.posiciones[dado] = 0
                }
            }
        } else {
            if (tablero.isEmpty()) {
                fin = true
                console.log("Partida finalizada")
            } else {
                noFichas = true
                if (dado == 7) {
                    console.log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                    player.puntos += tablero.posiciones["puchero"]
                    tablero.posiciones["puchero"] = 0
                } else if (dado == 12) {
                    console.log(`Jugador ${player.id} gana todos los puntos del tablero`)
                    for (const key in tablero.posiciones) {
                        player.puntos += tablero.posiciones[key]
                        tablero.posiciones[key] = 0
                    }
                } else {
                    console.log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                    player.puntos += tablero.posiciones[dado]
                    tablero.posiciones[dado] = 0
                }
            }
        }
        console.log(`Tablero: ${tablero.print()}`)
    })
} while (!fin)

players = players.sort((a, b) => b.puntos - a.puntos)

console.log(`El ganador es el jugador ${players[0].id} con ${players[0].puntos} puntos`)

