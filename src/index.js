function ocultarAlert(){
    document.getElementById('alert').style.display = 'none';
}

function mostrarAlert(){
    document.getElementById('alert').style.display = 'block';
}

// Obtener referencia a botón
const botonLogin = document.getElementById('button-lg');

botonLogin.addEventListener('click', function(evento){
    let user = document.getElementById("inputUser").value;
    let pass = document.getElementById("inputPass").value;


    if (user == 'admin' && pass === 'admin') {
        //alert(`Acceso consedido: \n  \n Usuario: ${user} \n Contraseña: ${pass}`);
        ocultarAlert();

    } else {
        console.log(`Valor de usuario: ${pass} \nValor de usuario: ${user}`);
        mostrarAlert();

    }
});

ocultarAlert();
