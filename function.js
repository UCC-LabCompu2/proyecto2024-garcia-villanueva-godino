const guardarValores = () => {
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    localStorage.setItem('a', a);
    localStorage.setItem('b', b);
}
window.onload = () => {
    guardarValores(); 
}
const mostrarResultados = () => {
    const a = parseFloat(localStorage.getItem('a'));
    const b = parseFloat(localStorage.getItem('b'));
    document.getElementById('pendiente').textContent = a;
    document.getElementById('termino_independiente').textContent = b;

    const ordenadaAlOrigen = calcularOrdenadaAlOrigen(b);
    document.getElementById('ordenada').textContent = ordenadaAlOrigen;

    const raiz = calcularRaiz(a, b);
    document.getElementById('raiz').textContent = raiz;
}

const calcularOrdenadaAlOrigen = (b) => {
    return b;
}

const calcularRaiz = (a, b) => {
    return -b / a;
}

window.onload = mostrarResultados;

const dibujarCuadriculado = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const xmax = canvas.width;
    const ymax = canvas.height;
    const paso = 40;

    // Dibujar líneas horizontales
    ctx.strokeStyle = "#bbb9b9";
    for (let i = paso; i < ymax; i += paso) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(xmax, i);
        ctx.stroke();
        ctx.closePath();
    }

    // Dibujar líneas verticales
    for (let i = paso; i < xmax; i += paso) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ymax);
        ctx.stroke();
        ctx.closePath();
    }

    // Dibujar ejes x e y
    ctx.beginPath();
    ctx.moveTo(0, ymax / 2);
    ctx.lineTo(xmax, ymax / 2);
    ctx.moveTo(xmax / 2, 0);
    ctx.lineTo(xmax / 2, ymax);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
};

const dibujarGrafico = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const a = parseFloat(localStorage.getItem('a'));
    const b = parseFloat(localStorage.getItem('b'));
    const xmax = canvas.width;
    const ymax = canvas.height;

    // Rango de la función en x
    const minX = -10; // Valor mínimo de x
    const maxX = 10; // Valor máximo de x

    // Rango de la función en y
    const minY = a * minX + b;
    const maxY = a * maxX + b;

    // Calcular el rango total en x e y
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    // Escala para convertir valores reales a coordenadas de canvas
    const scaleX = xmax / rangeX;
    const scaleY = ymax / rangeY;

    // Función lineal
    const funcion = x => a * x + b;

    // Limpiar el canvas
    ctx.clearRect(0, 0, xmax, ymax);

    // Dibujar cuadriculado
    dibujarCuadriculado();

    // Dibujar la función lineal
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
        const y = funcion(x);
        const xCanvas = (x - minX) * scaleX;
        const yCanvas = ymax - (y - minY) * scaleY;
        if (x === minX) {
            ctx.moveTo(xCanvas, yCanvas);
        } else {
            ctx.lineTo(xCanvas, yCanvas);
        }
    }
    ctx.stroke();
    ctx.closePath();
};
