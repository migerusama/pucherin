
var container = document.querySelector(".box");
const casillas = 9;

// crear puchero
var puchero = document.createElement('canvas');
puchero.classList.add('puchero');
puchero.width = 120;
puchero.height = 120;
container.appendChild(puchero);
pintarPuchero(puchero);
/* <!--Crear elementos canvas para las casillas-->
<!--Usar un bucle for para crear los elementos de manera automática--> 

< !--Los canvas se formarán en una elipse-- >*/
for (var i = 0; i < casillas; i++) {
    // Crear un elemento canvas
    var canvas = document.createElement('canvas');
    canvas.classList.add('casilla');
    // Establecer el ancho y alto del canvas en 50 (cada canvas será de 50 x 50)
    canvas.width = 120;
    canvas.height = 120;
    // Añadir el canvas a la página
    container.appendChild(canvas);

}

// Obtener una referencia a todos los elementos canvas en la página
var canvases = document.querySelectorAll('.casilla');



// Dibujar una elipse en cada canvas y posicionarlos en una elipse de 
for (var i = 0; i < canvases.length; i++) {
    // Obtener el contexto del canvas en 2D
    var ctx = canvases[i].getContext('2d');

    // Dibujar una elipse en el canvas
    ctx.beginPath();

    //ctx.ellipse(35, 35, 35, 35, 0, 0, 2 * Math.PI);
    //ctx.stroke();

    // Posicionar el canvas en la elipse 
    canvases[i].style.left = Math.cos(2 * Math.PI * i / casillas) * 400 + 400 - 25 + 'px';
    canvases[i].style.top = Math.sin(2 * Math.PI * i / casillas) * 250 + 300 - 25 + 'px';

    if (i > 4) pintarCasilla(canvases[i], i + 3)
    else pintarCasilla(canvases[i], i + 2)
}



function pintarCasilla(canvas, fichas, num) {
    var ctx = canvas.getContext('2d');
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    for (var i = 0; i < fichas; i++) {
        // Calcular la posición en el círculo para cada ficha
        var x = Math.cos(2 * Math.PI * i / fichas) * 35 + canvas.width / 2;
        var y = Math.sin(2 * Math.PI * i / fichas) * 35 + canvas.height / 2;

        // Dibujar la ficha en la posición calculada
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, 2 * Math.PI);
        if (i < num) ctx.fillStyle = 'red'
        else ctx.fillStyle = 'white'
        ctx.fill();

        ctx.fillStyle = 'white';
        // Establecer la fuente para el texto
        ctx.font = '24px sans-serif';
        // Dibujar el número en el canvas usando el método fillText()
        x = canvas.width / 2 - ctx.measureText(fichas).width / 2;
        y = canvas.height / 2 + 10;
        ctx.fillText(fichas, x, y);
    }

}

function pintarPuchero(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    for (var i = 0; i < 4; i++) {
        // Calcular la posición en el círculo para cada ficha
        var x = Math.cos(2 * Math.PI * i / 4) * 35 + canvas.width / 2;
        var y = Math.sin(2 * Math.PI * i / 4) * 35 + canvas.height / 2;

        // Dibujar la ficha en la posición calculada
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, 2 * Math.PI);

        ctx.fillStyle = 'white'
        ctx.fill();


        ctx.fillStyle = 'white';
        // Establecer la fuente para el texto
        ctx.font = '24px sans-serif';
        // Dibujar el número en el canvas usando el método fillText()
        x = canvas.width / 2 - ctx.measureText(7).width / 2;
        y = canvas.height / 2 + 10;
        ctx.fillText(7, x, y);
    }

}

// pintamos fichas aleatorias en el tablero
/* for (let i = 0; i < canvases.length; i++) {
    let fichas = Math.ceil(Math.random() * (i + 2));
    if (i > 4) pintarCasilla(canvases[i], i + 3, fichas)
    else pintarCasilla(canvases[i], i + 2, fichas)

    console.log(i + " " + (i + 2) + " " + fichas);
} */

//pintarCasilla(canvases[2], 4, 2); // pinta dos fichas en el 4
//pintarCasilla(canvases[8], 11, 5); // pinta 5 fichas en el 11
//pintarCasilla(canvases[6], 9, 3); // pinta 3 fichas en el 9

function start() {
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
            console.log(`Turno: ${turno}`)
            console.log(`Jugador: ${player.id}`)
            console.log(`Número de fichas: ${player.num_fichas}`)
            console.log(`-----------------`)
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
                    if (dado > 7) pintarCasilla(canvases[dado - 3], dado, tablero.posiciones[dado])
                    else pintarCasilla(canvases[dado - 2], dado, tablero.posiciones[dado])
                    if (tablero.posiciones[dado] == dado) {
                        console.log(`Jugador ${player.id} gana ${tablero.posiciones[dado]} puntos`)
                        player.puntos += tablero.posiciones[dado]
                        tablero.posiciones[dado] = 0
                    }
                }
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
                    if (dado > 7) pintarCasilla(canvases[dado - 3], dado, tablero.posiciones[dado])
                    else pintarCasilla(canvases[dado - 2], dado, tablero.posiciones[dado])
                }
                if (tablero.isEmpty()) {
                    fin = true
                    console.log("Partida finalizada")
                }
            }
            console.log(`Tablero: ${tablero.print()}`)
        })
    } while (!fin)

    var puntos = 0

    players.forEach(player => {
        if (player.puntos > puntos) {
            puntos = player.puntos
            winners = player
        }
    })

    console.log(`El ganador es el jugador ${winners.id} con ${winners.puntos} puntos`)
}