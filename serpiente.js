
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;
    const serpiente = [
      {x:12, y:12}, // Cabeza
      {x:11, y:12}, // Cuerpo
      {x:10, y:12}, // Cuerpo
      {x:10, y:11}  // Cuerpo
    ];

    // Guardar el identificador del intervalo
    let intervaloSerpiente = null;
    // Dirección inicial de la serpiente
    let direccionActual = "derecha";
    // Guardar la posición de la comida
    let comida = null;
    // Puntaje acumulado del jugador
    let puntaje = 0;
    // Indica si la partida ha finalizado
    let gameTerminado = false;

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {

    // Limpiar el canvas
    limpiarCanvas();

    // Dibujar la cuadrícula
    dibujarTablero();

    // Dibujar la comida
    pintarComida();

    // Dibujar la serpiente
    pintarSerpiente();
    }

    function dibujarTablero() {

    // Establecer el color de las líneas
    ctx.strokeStyle = "#2e00ad";

    // Iniciar un nuevo trazado
    ctx.beginPath();

    // Dibujar las líneas verticales
    for (let x = TAMANIO_CELDA; x < canvas.width; x += TAMANIO_CELDA) {

        // Punto inicial: parte superior
        ctx.moveTo(x, 0);

        // Punto final: parte inferior
        ctx.lineTo(x, canvas.height);
    }

    // Dibujar las líneas horizontales
    for (let y = TAMANIO_CELDA; y < canvas.height; y += TAMANIO_CELDA) {

        // Punto inicial: parte lateral izq
        ctx.moveTo(0, y);

        // Punto final: parte lateral der
        ctx.lineTo(canvas.width, y);
    }

    // Hacer visibles las líneas
    ctx.stroke();
  }

  function pintarParte(lineaX, lineaY, color = "#ff0000"){
    
    // Calcular la posición real en px
    let x = lineaX * TAMANIO_CELDA;
    let y = lineaY * TAMANIO_CELDA;

    //Color del cuadrado
    ctx.fillStyle = color;

    //Dibujar el cuadrado
    ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

    //Color del borde
    ctx.strokeStyle = "#ffffff";

    //Dibujar el botde
    ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
  }

  function pintarSerpiente(){

    //Recorrer todas las partes de la serpiente
    for(let i=0; i<serpiente.length; i++){

      //Obtener la parte actual de la serpiente
      let parte = serpiente[i];

      //Pintar cabeza y cuerpo
      if(i === 0){
        //Dibujar cabeza amarilla
        pintarParte(parte.x, parte.y, "#ffdd00");
      }else{
        //Dibujar cuerpo rojo
        pintarParte(parte.x, parte.y, "#ff0000");
      }

      //Dibujar la parte en sus coordenadas
      //pintarParte(parte.x, parte.y);
    }
  }

  function moverDerecha() {

    // Recuperar la cabeza actual
    let cabezaActual = serpiente[0];

    // Crear una nueva cabeza una celda a la derecha
    let nuevaCabeza = {
        x: cabezaActual.x + 1,
        y: cabezaActual.y
    };

    // Insertar la nueva cabeza al inicio
    serpiente.unshift(nuevaCabeza);

    // Eliminar el último segmento de la cola
    serpiente.pop();
}

function moverIzquierda() {

    // Recuperar la posición actual de la cabeza
    let cabezaActual = serpiente[0];

    // Crear una nueva cabeza una celda a la izquierda
    let nuevaCabeza = {
        x: cabezaActual.x - 1,
        y: cabezaActual.y
    };

    // Insertar la nueva cabeza al inicio del arreglo
    serpiente.unshift(nuevaCabeza);

    // Eliminar el último segmento de la cola
    serpiente.pop();
}

function moverArriba() {

    // Recuperar la cabeza actual
    let cabezaActual = serpiente[0];

    // Crear una nueva cabeza una celda hacia arriba
    let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y - 1
    };

    // Insertar la cabeza nueva
    serpiente.unshift(nuevaCabeza);

    // Eliminar la cola
    serpiente.pop();
}

function moverAbajo() {

    // Recuperar la cabeza actual
    let cabezaActual = serpiente[0];

    // Crear una nueva cabeza una celda hacia abajo
    let nuevaCabeza = {
        x: cabezaActual.x,
        y: cabezaActual.y + 1
    };

    // Insertar la cabeza nueva
    serpiente.unshift(nuevaCabeza);

    // Eliminar la cola
    serpiente.pop();
}

function cambiarDireccion(direccion) {

    // Verificar que la dirección sea válida
    if (
        direccion === "derecha" ||
        direccion === "izquierda" ||
        direccion === "arriba" ||
        direccion === "abajo"
    ) {

        // Guardar la última dirección seleccionada
        direccionActual = direccion;
    }
}

function moverSerpiente() {

    // No continuar si la partida ya terminó
    if (gameTerminado) {
      return;
    }

    // Comprobar los bordes antes de realizar el movimiento
    if (tocaBorde()) {
      finalizarJuego();
      return;
    }

    // Guardar la posición de la cola antes del movimiento
    let colaAnterior = {
        x: serpiente[serpiente.length - 1].x,
        y: serpiente[serpiente.length - 1].y
    };

    // Revisar la dirección actual
    if (direccionActual === "derecha") {

        moverDerecha();

    } else if (direccionActual === "izquierda") {

        moverIzquierda();

    } else if (direccionActual === "arriba") {

        moverArriba();

    } else if (direccionActual === "abajo") {

        moverAbajo();

    } else {

        return;
    }

    // Comprobar si la cabeza alcanzó la comida
    if (atrapaComida()) {

        // Incrementar el puntaje
        puntaje++;

        // Actualizar el marcador HTML
        actualizarPuntaje();

        // Agregar nuevamente la posición anterior de la cola
        serpiente.push(colaAnterior);

        // Permitir que se genere una nueva comida
        comida = null;
    }

    // Actualizar el tablero completo
    dibujarTodo();
}

function iniciarJuego() {

    // No permitir iniciar si la partida terminó
    if (gameTerminado) {
        console.log("La partida terminó. Debes reiniciar el juego.");
        return;
    }

    // Evitar intervalos duplicados
    if (intervaloSerpiente !== null) {
        return;
    }

    // Iniciar el movimiento automático
    intervaloSerpiente = setInterval(moverSerpiente, 1000);

    // Actualizar el estado visual
    document.getElementById("estado").textContent = "Jugando";
    document.getElementById("mensaje").textContent =
        "¡La serpiente está en movimiento!";

    console.log("Juego iniciado");
}

function pausarJuego() {

    // Detener el intervalo activo
    clearInterval(intervaloSerpiente);

    // Restablecer la variable
    intervaloSerpiente = null;

    // Mostrar mensaje de confirmación
    console.log("Juego pausado");
}

function pintarComida() {

    // Calcular la cantidad de columnas y filas
    let columnas = canvas.width / TAMANIO_CELDA;
    let filas = canvas.height / TAMANIO_CELDA;

    // Generar una posición solo si todavía no hay comida
    if (comida === null) {

    let x;
    let y;
    let ocupada;

    do {

        x = Math.floor(Math.random() * columnas);
        y = Math.floor(Math.random() * filas);

        // Comprobar si la celda pertenece al cuerpo
        ocupada = serpiente.some(parte =>
            parte.x === x && parte.y === y
        );

    } while (ocupada);

    comida = {x: x, y: y};
    }

    // Dibujar la comida con un color diferente
    pintarParte(comida.x, comida.y, "#22c55e");
}

// ========================================
// PARTE 9 - DETECTAR COLISIÓN CON COMIDA
// ========================================

function atrapaComida() {

    // Obtener la posición actual de la cabeza
    let cabeza = serpiente[0];

    // Comprobar si existe comida
    if (comida === null) {
        return false;
    }

    // Verificar si las coordenadas coinciden
    if (cabeza.x === comida.x && cabeza.y === comida.y) {

        // La serpiente alcanzó la comida
        return true;

    } else {

        // La serpiente no alcanzó la comida
        return false;
    }
}

function actualizarPuntaje() {

    // Mostrar el puntaje actual en el HTML
    document.getElementById("puntaje").textContent = puntaje;
}

function finalizarJuego() {

    // Marcar la partida como terminada
    gameTerminado = true;

    // Detener el movimiento automático
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;

    // Actualizar los mensajes del HTML
    document.getElementById("estado").textContent = "GAME OVER";
    document.getElementById("mensaje").textContent =
        "¡GAME OVER! La serpiente chocó contra un borde.";

    // Mostrar un mensaje en la consola
    console.log("GAME OVER - Puntaje final:", puntaje);
}

function tocaBorde() {

    // Obtener la cabeza actual
    let cabeza = serpiente[0];

    // Copiar sus coordenadas
    let siguienteX = cabeza.x;
    let siguienteY = cabeza.y;

    // Calcular la siguiente posición según la dirección
    if (direccionActual === "derecha") {
        siguienteX++;

    } else if (direccionActual === "izquierda") {
        siguienteX--;

    } else if (direccionActual === "arriba") {
        siguienteY--;

    } else if (direccionActual === "abajo") {
        siguienteY++;
    }

    // Calcular la cantidad de columnas y filas
    let columnas = canvas.width / TAMANIO_CELDA;
    let filas = canvas.height / TAMANIO_CELDA;

    // Devolver true si el movimiento supera algún borde
    return (
        siguienteX < 0 ||
        siguienteX >= columnas ||
        siguienteY < 0 ||
        siguienteY >= filas
    );
}