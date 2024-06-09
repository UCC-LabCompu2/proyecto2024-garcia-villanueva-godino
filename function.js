const validar = () => {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);

    if (a>11 || b>11){
        alert("Los numeos ingresados son demasiado grandes")
    } else if (a<-11 || b<-11 ) {
        alert("Los numeros ingresados son demasiados chicos")
    } else {
        guardarValores();
    }
    
}

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

let dibujarCuadriculado = () => {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    const xmax = canvas.width
    const ymax = canvas.height
    const paso = 40

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
        ctx.lineTo(i, xmax)
        ctx.stroke()
    }

    ctx.beginPath()
    ctx.moveTo(0, ymax/2)
    ctx.lineTo(xmax, ymax/2)
    ctx.strokeStyle = "#000000"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(xmax/2, 0)
    ctx.lineTo(xmax/2, ymax)
    ctx.strokeStyle = "#000000"
    ctx.stroke()
    ctx.closePath()

}

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
