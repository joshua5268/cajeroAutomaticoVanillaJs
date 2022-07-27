const contenido = document.querySelector('#contenido');
const inicio = document.querySelector('#tagInicio');
const retiro = document.querySelector('#tagRetiro');
const ingreso = document.querySelector('#tagIngreso');
const perfil = document.querySelector('#tagDatos');
const tagTransferencias = document.querySelector('#tagTransferencias');

const inputSaldo = document.querySelector('#inputSaldo');
const bienvenida = document.querySelector('#bienvenida');
const btnCerrar = document.querySelector('#btnCerrar');
const btnFlip = document.querySelector('#flip');

//Usuario activo
let usuario = users.filter(user => user.correo == localStorage.getItem('correo'));

//permanencia de datos
if(localStorage.getItem(usuario[0].correo)){
    usuario[0] = JSON.parse(localStorage.getItem(usuario[0].correo));
}

//Variables para uso rapido 
const {name, correo, pass, foto} = usuario[0];
let {saldo} = usuario[0];

//Mostrar saludo
bienvenida.textContent = `Bienvenido ${name}`;

//Mostrar saldo en HTML inicial
inputSaldo.textContent = `$${saldo}`;



//-------------------------------------------Funciones---------------------------------------------


//Funcion para cambiar de HTML

function mostrarHTML(a){
    const mostrar = document.createElement('div');
    mostrar.innerHTML = a;

    if(contenido.firstElementChild){
        contenido.firstElementChild.remove();
    }
    
    contenido.appendChild(mostrar);
}

//Funcion que valida datos de entrada Numbers

function validarCantidad(a){
    if(a <= 0 || typeof(a) == undefined || isNaN(a)){
        return false;
    }else{
        return true;
    }
}

//Funcion valida que no sea menos de 10 o mas de 990

function validarMayor(a){
    if(a < 10 || a > 990){
        return false;
    }else{
        return true;
    }
}

//Funcion que edita variables si la cantidad es correcta

function transaccionTrue(a){
    usuario[0].saldo = a;
    saldo = usuario[0].saldo;
    localStorage.setItem(correo, JSON.stringify(usuario[0]));
}




//Funciones para pintar texto
function pintaTextoD(a){
    if(a.classList.contains('text-success')){
        a.classList.replace('text-success', 'text-danger');
    }else{
        a.classList.add('text-danger');
    }
}

function pintaTextoS(a){
    if(a.classList.contains('text-danger')){
        a.classList.replace('text-danger', 'text-success');
    }else{
        a.classList.add('text-success');
    }
}


//-----------------------Eventos---------------


//Mostrar HTML inicio

inicio.addEventListener('click', () => {
    const cuerpo =  `
    <div class="tarjeta mt-5 rotar2" id="flip"">
        <div class="box">
            <div class="card front d-flex justify-content-center align-items-center">
            <p>Presiona aqui para consultar tu saldo actual</p>
            </div>
            <div class="card back d-flex justify-content-center align-items-center">
                <h3 class="card-title mb-5">Tu saldo actual es de: </h3>
                <p class="fs-5">$${saldo}</p>
            </div>
        </div>
    </div>
    `;

    mostrarHTML(cuerpo);

    inicio.firstElementChild.classList.add('active');
    retiro.firstElementChild.classList.remove('active');
    ingreso.firstElementChild.classList.remove('active');
    perfil.firstElementChild.classList.remove('active');
    tagTransferencias.firstElementChild.classList.remove('active');

    const btnFlip = document.querySelector('#flip');

    btnFlip.addEventListener('click', () => {
        if(btnFlip.classList.contains('rotar2')){
            btnFlip.classList.replace('rotar2', 'rotar1');
        }else{
            btnFlip.classList.replace('rotar1', 'rotar2');
        }
    });

});

//Mostrar HTML retiro

retiro.addEventListener('click', () => {
    const cuerpo = `
    <div class="card my-5 p-5 text-center">
        <form id="formRetiro">
            <h3>Ingresa cantidad a retirar:</h3>
            <div class="mb-3">
                <label for="inputRetiro" class="form-label fs-5 text-white">Cantidad a retirar:</label>
                <input type="text" class="form-control" id="inputRetiro" placeholder="$" required>
            </div>
            <button class="btn btn-success mb-3" type="submit" id="btnRetiro">Confirmar</button>
            <p id="inputRespuesta" class="fs-5"></p>
            <p id="inputMonto" class="fs-5"></p>
        </form>
    </div>
    `;

    mostrarHTML(cuerpo);

    retiro.firstElementChild.classList.add('active');
    inicio.firstElementChild.classList.remove('active');
    ingreso.firstElementChild.classList.remove('active');
    perfil.firstElementChild.classList.remove('active');
    tagTransferencias.firstElementChild.classList.remove('active');

    const btnRetiro = document.querySelector('#btnRetiro');
    const formRetiro = document.querySelector('#formRetiro');
    const inputRetiro = document.querySelector('#inputRetiro');
    const inputRespuesta = document.querySelector('#inputRespuesta');
    const inputMonto = document.querySelector('#inputMonto');

    btnRetiro.addEventListener('click', (e) => {
        e.preventDefault();
        const monto = Number(inputRetiro.value);
        formRetiro.reset();
        let resultado = Number(saldo)-Number(monto);

        if(validarCantidad(monto)){
            if(validarMayor(resultado)){
                transaccionTrue(resultado);
                pintaTextoS(inputRespuesta);
                inputRespuesta.textContent = `Transaccion Correcta`;
                pintaTextoS(inputMonto);
                inputMonto.textContent = `Tu Nuevo monto es de: ${saldo}`;
            }else{
                pintaTextoD(inputRespuesta);
                inputRespuesta.textContent = 'No puedes tener menos de $10 en tu cuenta';
                inputMonto.textContent = ``;
            }
        }else{
            pintaTextoD(inputRespuesta);
            inputRespuesta.textContent = 'Por favor valide informacion';
            inputMonto.textContent = ``;
        }
    });


});

//Mostrar HTML ingreso

ingreso.addEventListener('click', () => {
    const cuerpo = `
    <div class="card my-5 p-5 text-center">
        <form id="formIngreso">
            <h3>Ingresa cantidad a ingresar:</h3>
            <div class="mb-3">
                <label for="inputIngreso" class="form-label fs-5 text-white">Cantidad a ingresar:</label>
                <input type="text" class="form-control" id="inputIngreso" placeholder="$">
            </div>
            <button class="btn btn-success mb-3" type="submit" id="btnIngreso">Confirmar</button>
            <p id="inputRespuesta" class="fs-5"></p>
            <p id="inputMonto" class="fs-5"></p>
        </form>
    </div>
    `;

    mostrarHTML(cuerpo);

    ingreso.firstElementChild.classList.add('active');
    inicio.firstElementChild.classList.remove('active');
    retiro.firstElementChild.classList.remove('active');
    perfil.firstElementChild.classList.remove('active');
    tagTransferencias.firstElementChild.classList.remove('active');

    const btnIngreso = document.querySelector('#btnIngreso');
    const formIngreso = document.querySelector('#formIngreso');
    const inputIngreso = document.querySelector('#inputIngreso');
    const inputRespuesta = document.querySelector('#inputRespuesta');
    const inputMonto = document.querySelector('#inputMonto');

    btnIngreso.addEventListener('click', (e) => {
        e.preventDefault();
        const monto = Number(inputIngreso.value);
        formIngreso.reset();
        let resultado = Number(saldo)+Number(monto);

        if(validarCantidad(monto)){
            if(validarMayor(resultado)){
                transaccionTrue(resultado);
                pintaTextoS(inputRespuesta);
                inputRespuesta.textContent = `Transaccion Correcta`;
                pintaTextoS(inputMonto);
                inputMonto.textContent = `Tu Nuevo monto es de: ${saldo}`;
            }else{
                pintaTextoD(inputRespuesta);
                inputRespuesta.textContent = 'No puedes tener menos de $990 en tu cuenta';
                inputMonto.textContent = ``;
            }
        }else{
            pintaTextoD(inputRespuesta);
            inputRespuesta.textContent = 'Por favor valide informacion';
            inputMonto.textContent = ``;
        }
    });
});


perfil.addEventListener('click', () => {
    const cuerpo = `
    <div class="card my-5 p-5 text-center perfil">
            <h3 class="mb-4">MI PERFIL</h3>
            <div class="container-img p-2">
                <img src="${foto}" class="img-fluid object-fit">
            </div>
            <div class="my-3">
                <h5>Nombre: ${name}</h5>
                <h5>Correo: ${correo}</h5>
                <h5>Saldo: $${saldo}</h5>
            </div>
            <button class="btn btn-success" id="btnChange">Cambiar contraseña</button>
            <div class="d-none" id="divChange">
                <form id="formPass">
                    <div class="">
                        <label for="nueva" class="form-label fs-6">Nueva contraseña</label>
                        <input type="text" class="form-control mb-2" id="nueva" placeholder="contraseña" required>
                    </div>
                    <div class="">
                        <label for="confirmar" class="form-label fs-6">Confirmar contraseña</label>
                        <input type="password" class="form-control mb-2" id="confirmar" placeholder="confirmar" required>
                    </div>
                    <button class="btn btn-success type="submit" w-100" id="btnNueva">Confirmar</button>
                </form>
            </div>
            <p id="inputRespuesta" class="fs-6 mt-2"></p>
    </div>
    `;

    mostrarHTML(cuerpo);

    ingreso.firstElementChild.classList.remove('active');
    inicio.firstElementChild.classList.remove('active');
    retiro.firstElementChild.classList.remove('active');
    perfil.firstElementChild.classList.add('active');
    tagTransferencias.firstElementChild.classList.remove('active');
    
    const btnChange = document.querySelector('#btnChange');
    const divChange = document.querySelector('#divChange');
    const formPass = document.querySelector('#formPass');
    const nueva = document.querySelector('#nueva');
    const confirmar = document.querySelector('#confirmar');
    const inputRespuesta = document.querySelector('#inputRespuesta');
    
    btnChange.addEventListener('click', (e) => {
        e.preventDefault();
        btnChange.classList.add('d-none');
        divChange.classList.replace('d-none', 'd-block');
    });

    formPass.addEventListener('submit', (e) => {
        e.preventDefault();
        if(nueva.value == confirmar.value){
            formPass.reset();
            usuario[0].pass = nueva.value;
            localStorage.setItem(correo, JSON.stringify(usuario[0]));
            pintaTextoS(inputRespuesta);
            inputRespuesta.textContent = 'Contraseña cambiada correctamente';
        }else{
            pintaTextoD(inputRespuesta);
            inputRespuesta.textContent = 'Las contraseñas no coinciden';
        }
    })
});


tagTransferencias.addEventListener('click', () => {
    let opciones = ``;
    for (const key in users) {
        if(users[key].correo != correo){
            opciones += `<option value="${users[key].correo}">${users[key].correo}</option>`
        }
    }

    const cuerpo = `
    <div class="card my-5 p-5 text-center">
            <h3 class="mb-4">Transferencia</h3>
            <form id="formTrans">
                <div class="">
                    <label for="userTrans" class="form-label fs-6">Seleccione usuario a transferir</label>
                    <select class="form-select mb-3" id="userTrans" required>
                        <option value="" selected>Selecciona un usuario...</option>
                        ${opciones}
                    </select>
                </div>
                <div class="">
                    <label for="numTrans" class="form-label fs-6">Digite cantidad a transferir</label>
                    <input type="text" class="form-control mb-2" id="numTrans" placeholder="$" required>
                </div>
                <button class="btn btn-success type="submit" w-100" id="btnTrans">Confirmar</button>
            </form>
            <p id="inputRespuesta" class="fs-6 mt-2"></p>
            <p id="inputTransferencia" class="fs-6 mt-2"></p>
    </div>
    `;

    mostrarHTML(cuerpo);

    ingreso.firstElementChild.classList.remove('active');
    inicio.firstElementChild.classList.remove('active');
    retiro.firstElementChild.classList.remove('active');
    perfil.firstElementChild.classList.remove('active');
    tagTransferencias.firstElementChild.classList.add('active');

    const formTrans = document.querySelector('#formTrans');
    const userTrans = document.querySelector('#userTrans');
    const numTrans = document.querySelector('#numTrans');
    const inputRespuesta = document.querySelector('#inputRespuesta');
    const inputTransferencia = document.querySelector('#inputTransferencia');

    formTrans.addEventListener('submit', (e) => {
        e.preventDefault();
        let inputUsuario = userTrans.value;
        let inputCantidad = numTrans.value;
        const destino = users.filter(user => user.correo == inputUsuario)[0];
        const resultado = Number(destino.saldo)+Number(inputCantidad);
        formTrans.reset();
        
        if(validarCantidad(inputCantidad)){
            if(saldo-10 > inputCantidad){
                if(validarMayor(resultado)){
                    usuario[0].saldo -= inputCantidad;
                    saldo = usuario[0].saldo;
                    localStorage.setItem(usuario[0].correo, JSON.stringify(usuario[0]));
                    destino.saldo = Number(resultado);
                    localStorage.setItem(destino.correo, JSON.stringify(destino));
                    pintaTextoS(inputRespuesta);
                    inputRespuesta.textContent = 'Transsaccion Correcta';
                }else{
                    pintaTextoD(inputRespuesta);
                    inputRespuesta.textContent = 'Transsaccion incorrecta por politicas del banco';
                }
            }else{
                pintaTextoD(inputRespuesta);
                inputRespuesta.textContent = 'No tienes suficiente saldo';
            }
        }else{
            pintaTextoD(inputRespuesta);
            inputRespuesta.textContent = 'Por favor valide la informacion';
        }
    });
});

//Cerrar sesion

btnCerrar.addEventListener('click', () => {
    localStorage.removeItem('correo');
    window.open('index.html', "_self");
});

//flip-card

btnFlip.addEventListener('click', () => {
    if(btnFlip.classList.contains('rotar2')){
        btnFlip.classList.replace('rotar2', 'rotar1');
    }else{
        btnFlip.classList.replace('rotar1', 'rotar2');
    }
});


let tiempo, segundos = 0;
  
function resetear() {
    clearInterval(tiempo);
    segundos = 0;
    tiempo = setInterval(iniciar, 1000);
}

// Define the events that
// would reset the timer
window.onload = resetear;
window.onmousemove = resetear;
window.onmousedown = resetear;
window.ontouchstart = resetear;
window.onclick = resetear;
window.onkeypress = resetear;

function iniciar() {
    segundos++;
    if(segundos == 2000){
        alert('La sesion ha expirado');
        localStorage.removeItem('correo');
        window.open('index.html', "_self");
    }
}