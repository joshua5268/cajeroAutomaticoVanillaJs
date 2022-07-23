const correo = document.querySelector('#correo');
const pass = document.querySelector('#pass');
const formLogin = document.querySelector('#formLogin');
const respuesta = document.querySelector('#respuesta');
const btnLogin  = document.querySelector('#btnLogin');

function validarInfo(a){
    if(a){
        return true;
    }else{
        respuesta.textContent = 'Por favor completa la informacion';
        return false;
    }
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const inputCorreo = correo.value;
    const inputPass = pass.value;
    let arr = [];

    if(validarInfo(inputCorreo)){
        arr = users.filter(user => user.correo == inputCorreo)
        if(validarInfo(inputPass)){
            arr = arr.filter(ar => ar.pass == inputPass);
            if(arr.length > 0){
                localStorage.setItem('correo', inputCorreo);
                window.open('inicio.html',"_self")
            }else{
                respuesta.textContent = 'Por favor valida tu informacion';
            }
        }
    }

});