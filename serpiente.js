
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

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();

      dibujarTablero();

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

    // Actualizar el tablero completo
    dibujarTodo();
}

function iniciarJuego() {

    // Evitar crear varios intervalos al presionar Iniciar repetidamente
    if (intervaloSerpiente !== null) {
        return;
    }

    // Ejecutar moverSerpiente una vez por segundo
    intervaloSerpiente = setInterval(moverSerpiente, 1000);

    // Mostrar información en consola
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