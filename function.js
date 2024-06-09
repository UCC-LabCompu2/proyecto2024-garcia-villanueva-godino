function calcular (){
    var pendiente = document.getElementById ("a").value;
    localStorage.setItem ("textvalue", pendiente);
    return false;
}
function mostrarResultados (){
    document.getElementById("pendiente").innerHTML=localStorage.getItem("textvalue");
}