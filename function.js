/**
 * validar la entrada de valores antes de calcular 
 * @method validar
 * @returns valor de tipo bool
 */
const validar = () => {
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;

    if (a === "" || b === "") {
        alert("Todos los campos deben estar completados");
        return false;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (numA < -10 || numA > 10 || numB < -10 || numB > 10) {
        alert("Los valores ingresados deben estar dentro del rango");
        document.getElementById("a").value = "";
        document.getElementById("b").value = "";
        return false;
    }
    guardarValores();
    return true;
}

/**
 * guardar los valores ingresados por el usuario una vez ya validados
 * @method guardarValores
 */
const guardarValores = () => {
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    localStorage.setItem('a', a);
    localStorage.setItem('b', b);

    window.onload = guardarValores();
}

/**
 * retoma los valores ingresados por el usuario y accede a los calculos
 * @method mostrarResultados
 */
const mostrarResultados = () => {
    const a = parseFloat(localStorage.getItem('a'));
    const b = parseFloat(localStorage.getItem('b'));
    document.getElementById('pendiente').textContent = a;
    document.getElementById('termino_independiente').textContent = b;

    const ordenada = calcularOrdenada(b);
    document.getElementById('ordenada').textContent = ordenada;

    const raiz = calcularRaiz(a, b);
    document.getElementById('raiz').textContent = raiz;

    if (a === 0){
        document.getElementById("raiz").textContent="no tiene raiz";
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

window.onload = mostrarResultados;

/**
 * dibuja la cuadricula del canvas y los ejes cartesianos una vez presionado el botón
 * @method dibujarCuadriculado
 */
let dibujarCuadriculado = () => {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    const xmax = canvas.width
    const ymax = canvas.height
    const paso = 80

    ctx.strokeStyle = "#bbb9b9"

    for (let i = paso; i < ymax; i += paso) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(xmax, i)
        ctx.stroke()
        ctx.closePath()
    }

    for (let i = paso; i < xmax; i += paso) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, ymax)
        ctx.stroke()
    }

    ctx.beginPath()
    ctx.moveTo(0, ymax / 2)
    ctx.lineTo(xmax, ymax / 2)
    ctx.strokeStyle = "#000000"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(xmax / 2, 0)
    ctx.lineTo(xmax / 2, ymax)
    ctx.strokeStyle = "#000000"
    ctx.stroke()
    ctx.closePath()

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = paso; i < xmax; i += paso) {
        ctx.fillText((i - xmax / 2) / paso * 10, i, ymax / 2 + 20);
    }

    for (let i = paso; i < ymax; i += paso) {
        ctx.fillText((ymax / 2 - i) / paso * 10, xmax / 2 - 20, i);
    }
}

/**
 * dibuja el grafico de la funcion correspondiete a los datos ingresados por el usuario
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

    const escalaX = xmax / rangoX;
    const escalaY = ymax / rangoY;

    const funcion = x => a * x + b;

    ctx.clearRect(0, 0, xmax, ymax);

    dibujarCuadriculado();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
        const y = funcion(x);
        const xCanvas = (x - minX) * escalaX;
        const yCanvas = ymax - (y - minY) * escalaY;
        if (x === minX) {
            ctx.moveTo(xCanvas, yCanvas);
        } else {
            ctx.lineTo(xCanvas, yCanvas);
        }
    }
    ctx.stroke();
    ctx.closePath();
    
}


