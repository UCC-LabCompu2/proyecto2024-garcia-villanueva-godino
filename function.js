/**
 * Validar que el usuario haya completado todos los campos del formulario antes de continuar
 * @method validarYContinuar
 * @returns {boolean} - true si el form esta completado correctamente
 */
const validarYContinuar = () => {
    const nombre = document.getElementById("nombre").value.trim();
    const profesion = document.querySelector('input[name="profesion"]:checked');

    if (nombre === "" || !profesion) {
        alert("Por favor complete todos los campos")
        return false;
    }

    if (/\d/.test(nombre)) {
        alert("El nombre no puede contener numeros. Inténtelo de nuevo")
        document.getElementById("nombre").value = "";
        return false;
    }
    window.location.href = "principal.html";
    return true;
};

/**
 * Validar la entrada de valores antes de calcular y guardar valores si estos son correctos
 * @method validarYguardar
 * @returns {boolean} - true si los valores son válidos, false en caso contrario
 */
const validarYguardar = () => {
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;

    if (a === "") {
        alert("Todos los campos deben estar completados");
        document.getElementById("a").value = "";
        return false;
    }
    if (b === "") {
        alert("Todos los campos deben estar completados");
        document.getElementById("b").value = "";
        return false;
    }
    if (a < -10 || a > 10) {
        alert("El valor debe estar dentro del rango -10 a 10");
        document.getElementById("a").value = "";
        return false;
    }
    if (b < -10 || b > 10) {
        alert("El valor debe estar dentro del rango -10 a 10");
        document.getElementById("b").value = "";
        return false;
    }
    guardarValores();
    window.location.href = "calculo.html";
    return true;

}

/**
 * Guardar los valores ingresados por el usuario una vez ya validados
 * @method guardarValores
 */
const guardarValores = () => {
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    localStorage.setItem('a', a);
    localStorage.setItem('b', b);
}

/**
 * Retomar los valores ingresados por el usuario y acceder a los cálculos
 * @method mostrarResultados
 */
const mostrarResultados = () => {
    const a = parseFloat(localStorage.getItem('a'));
    const b = parseFloat(localStorage.getItem('b'));
    document.getElementById('pendiente').textContent = a.toString();
    document.getElementById('termino_independiente').textContent = b.toString();

    const ordenada = calcularOrdenada(b);
    document.getElementById('ordenada').textContent = ordenada;

    const raiz = calcularRaiz(a, b);
    document.getElementById('raiz').textContent = raiz;

    if (a === 0) {
        document.getElementById("raiz").textContent = "no tiene raiz";
    }
}


/**
 * calcular la ordenada al origen
 * @method calcularOrdenada
 * @param {number} b valor del término independiente
 * @returns ordenada al origen de la funcion
 */
const calcularOrdenada = (b) => {
    return b;
}

/**
 * caluclar la raiz
 * @param {number} a valor del término lineal
 * @param {number} b valor del término independiente
 * @returns raiz de la funcion
 */
const calcularRaiz = (a, b) => {
    return -b / a;
}


/**
 * Dibuja la cuadrícula del canvas y los ejes cartesianos cuando la página cargue.
 * @method dibujarCuadriculado
 * @param {number} xmax ancho maximo del canvas
 * @param {number} ymax altura maxima del canvas
 * @param {number} paso distancia entre las linas del cuadriculado
 */
const dibujarCuadriculado = (ctx, xmax, ymax, paso) => {
    ctx.strokeStyle = "#bbb9b9";
    ctx.lineWidth = 1;

    // Líneas horizontales
    for (let i = paso; i < ymax; i += paso) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(xmax, i);
        ctx.stroke();
        ctx.closePath();
    }

    // Líneas verticales
    for (let i = paso; i < xmax; i += paso) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ymax);
        ctx.stroke();
        ctx.closePath();
    }

    // Eje X
    ctx.beginPath();
    ctx.moveTo(0, ymax / 2);
    ctx.lineTo(xmax, ymax / 2);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Eje Y
    ctx.beginPath();
    ctx.moveTo(xmax / 2, 0);
    ctx.lineTo(xmax / 2, ymax);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Números en el eje X
    ctx.fillStyle = "#000000";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for (let xi = -10; xi <= 10; xi++) {
        const xCanvas = (xmax / 2) + xi * paso;
        const yText = ymax / 2 + 15;
        ctx.fillText(xi.toString(), xCanvas, yText);
    }

    // Números en el eje Y
    for (let yi = -10; yi <= 10; yi++) {
        const yCanvas = (ymax / 2) - yi * paso;
        const xText = xmax / 2 - 15;
        ctx.fillText(yi.toString(), xText, yCanvas);
    }
};

/**
 * Realiza la animación progresiva del gráfico de una función en un canvas.
 * @method animarGrafico
 * @param {function} funcion - función a graficar
 * @param {number} escalaX - escala en el eje X
 * @param {number} escalaY - escala en el eje Y
 * @param {number} minX - valor mínimo del eje X.
 * @param {number} maxX - valor máximo del eje X.
 * @param {number} ymax - altura máxima del canvas (eje Y).
 * @param {number} paso - distancia entre líneas del cuadriculado.
 */
const animarGrafico = (ctx, funcion, escalaX, escalaY, minX, maxX, ymax, paso) => {
    let x = minX;
    const animacion = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        dibujarCuadriculado(ctx, ctx.canvas.width, ctx.canvas.height, paso);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let xi = minX; xi <= x; xi += 0.1) {
            const yi = funcion(xi);
            const xCanvas = (xi - minX) * escalaX;
            const yCanvas = ymax - (yi - minX) * escalaY;
            if (xi === minX) {
                ctx.moveTo(xCanvas, yCanvas);
            } else {
                ctx.lineTo(xCanvas, yCanvas);
            }
        }
        ctx.stroke();
        ctx.closePath();

        x += 0.1;

        if (x <= maxX) {
            requestAnimationFrame(animacion);
        }
    };
    animacion();
};

/**
 * Se encarga de mostrar todos los elementos del canvas y establece la escala del canvas.
 * @method dibujarGrafico
 */
const dibujarGrafico = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const a = parseFloat(localStorage.getItem('a'));
    const b = parseFloat(localStorage.getItem('b'));
    const xmax = canvas.width;
    const ymax = canvas.height;

    const minX = -10;
    const maxX = 10;

    const minY = -10;
    const maxY = 10;

    const rangoX = maxX - minX;
    const rangoY = maxY - minY;

    const paso = 40;
    const escalaX = xmax / rangoX;
    const escalaY = ymax / rangoY;

    const funcion = x => a * x + b;

    ctx.clearRect(0, 0, xmax, ymax);

    dibujarCuadriculado(ctx, xmax, ymax, paso);

    animarGrafico(ctx, funcion, escalaX, escalaY, minX, maxX, ymax, paso);
}




