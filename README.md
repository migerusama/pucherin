# Pucheritn

- El juego en consola y el juego por la interfaz gráfica tienen sus archivos html y js separados.
- La versión subida a gitHub Pages es la versión gráfica, pero esta pendiente de algunos cambios por el momento.
- **Tenemos una versión funcional del Juego en la consola del navegador en consolaIndex.html.**

# Funcionamiento del Juego

**El juego esta dividido en dos fases**.

#### Fase 1

- Los jugadores toman turnos para tirar los dados.
- Cada turno, cada jugador depositará en la casilla correspondiente una ficha. La casilla corresponde al numero obtenido en la suma de los dados.
- Si el jugador completa una casilla, las fichas ganadas y retiradas del tablero se le sumaran a su puntuación, y estas no se podran volver a jugar.
- Si el Jugador saca un 12, se llevara el contenido del puchero.
- Cuando todos los jugadores se queden sin fichas, empezara la fase 2.

#### Fase 2

- Los jugadores tirarán los dados por turnos, recogiendo las fichas que esten en la casilla que corresponda a la suma del numero sacado de los dados. Estas fichas se le sumarán a los puntos.
- El juego finalizara una vez no hayan fichas en el tablero.
- Si un jugador saca un 12 durante esta fase, este se quedara todas las fichas de todas las casillas y el juego finilizará.

### Características

- Juego en Consola o Gráfico
- Juego Manual o Automatico
- De 2 a 5 Jugadores
