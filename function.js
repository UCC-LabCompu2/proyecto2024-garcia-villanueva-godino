const validarYContinuar = () => {
    const nombre = document.getElementById("nombre").value.trim();
    const profesion = document.querySelector('input[name="profesion"]:checked');

    if (nombre === "" || !profesion) {
        alert ("Por favor complete todos los campos")
        return false;
    }

    if (/\d/.test(nombre)) {
        alert ("El nombre no puede contener numeros. Inténtelo de nuevo")
        document.getElementById("nombre").value = "";
        return false;
    }
    window.location.href = "principal.html";
    return true;
};



/**
 * Validar la entrada de valores antes de calcular y guardar valores si estos son correctos 
 * @method validar
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
    document.getElementById('pendiente').textContent = a;
    document.getElementById('termino_independiente').textContent = b;

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

window.onload = mostrarResultados;

/**
 * dibuja la cuadricula del canvas y los ejes cartesianos cuando la pagina cargue
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

}


/**
 * dibuja el grafico de la funcion correspondiete a los datos ingresados por el usuario cuando la pagina carga
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

    const raiz = -b / a;
    const ordenada = b;

    ctx.fillStyle = "black";

    const xCanvas = (raiz - minX) * escalaX;
    ctx.beginPath();
    ctx.arc(xCanvas, ymax / 2, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    const yCanvas = ymax - (ordenada - minY) * escalaY;
    ctx.beginPath();
    ctx.arc(xmax / 2, yCanvas, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

}


