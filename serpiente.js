
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

    function dibujarTablero(){
      // Establecer el color de la línea
    ctx.strokeStyle = "#2e00ad";

    // Iniciar un nuevo trazo
    ctx.beginPath();

    // Establecer el punto inicial
    ctx.moveTo(25, 0);

    // Establecer el punto final
    ctx.lineTo(25, canvas.height);

    // Dibujar la línea
    ctx.stroke();
    }



