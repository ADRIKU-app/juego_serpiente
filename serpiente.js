
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;

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



