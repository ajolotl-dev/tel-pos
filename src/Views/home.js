const $ = selector => document.querySelector(selector);
const txtName = $('#txtName');

let datosUsuario;

window.electronAPI.userData().then((data) => {
    datosUsuario = data;
    txtName.textContent = datosUsuario.user;
  }).catch((error) => {
    console.error(error);
});


const btnLogout = $('#btnLogout');// Obtener referencia a botón por id


function signOut() {
    window.electronAPI.signOut();
}

window.addEventListener('beforeunload', (event) => {
    signOut();
});

btnLogout.addEventListener('click', (event) => {
    signOut();
});



