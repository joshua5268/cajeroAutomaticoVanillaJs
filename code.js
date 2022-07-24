const contenido = document.querySelector('#contenido');
const inicio = document.querySelector('#tagInicio');
const retiro = document.querySelector('#tagRetiro');
const ingreso = document.querySelector('#tagIngreso');
const inputSaldo = document.querySelector('#inputSaldo');
const bienvenida = document.querySelector('#bienvenida');
const btnCerrar = document.querySelector('#btnCerrar');

const usuarioLocal = localStorage.getItem('correo');
const usuario = users.filter(user => user.correo == usuarioLocal);

//permanencia de datos
if(localStorage.getItem(usuarioLocal)){usuario[0].saldo = localStorage.getItem(usuarioLocal)}

const {name, correo, pass} = usuario[0];
let {saldo} = usuario[0];

console.log(saldo);

//Mostrar saludo
bienvenida.textContent = `Bienvenido ${name}`;

//Mostrar saldo en HTML inicial
inputSaldo.textContent = `$${saldo}`;


//Funcion para cambiar de HTML

function mostarHTML(a){
    const mostrar = document.createElement('div');
    mostrar.innerHTML = a;

    if(contenido.firstElementChild){
        contenido.firstElementChild.remove();
    }
    
    contenido.appendChild(mostrar);
}

//Funcion que valida datos de entrada Numbers

function validarCantidad(a, b, c){
    if(a <= 0 || typeof(a) == undefined || isNaN(a)){
        pintaTextoD(b);
        pintaTextoD(c);
        b.textContent = 'Por favor ingrese una cantidad valida';
        c.textContent = '';
        return false;
    }else{
        return true;
    }
}

//Funcion valida que no sea menos de 10 o mas de 990

function validarMayor(a, b, c){
    if(a < 10 || a > 990){
        pintaTextoD(b);
        pintaTextoD(c);
        b.textContent = 'Lo sentimos, como regla general del banco no puede tener menos de $10 o mas de $990';
        c.textContent = '';
        console.log(a);
        return false;
    }else{
        return true;
    }
}

//Funcion que edita variables si la cantidad es correcta

function transaccionTrue(a){
    usuario.saldo = a;
    saldo = usuario.saldo;
    pintaTextoS(inputRespuesta);
    pintaTextoS(inputMonto);
    inputRespuesta.textContent = 'Transaccion Correcta';
    inputMonto.textContent = `Tu nuevo saldo es de: $${saldo}`;
    localStorage.setItem(correo, saldo);
}

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

//Mostrar HTML inicio

inicio.addEventListener('click', () => {
    const cuerpo =  `
    <div class="card my-5 p-5 text-center">
        <h3 class="card-title mb-5">Tu saldo actual es de: </h3>
        <p class="fs-5">$ ${saldo}</p>
    </div>
    `;

    mostarHTML(cuerpo);

    inicio.firstElementChild.classList.add('active');
    retiro.firstElementChild.classList.remove('active');
    ingreso.firstElementChild.classList.remove('active');

});

//Mostrar HTML retiro

retiro.addEventListener('click', () => {
    const cuerpo = `
    <div class="card my-5 p-5 text-center">
        <form id="formRetiro">
            <h3>Ingresa cantidad a retirar:</h3>
            <div class="mb-3">
                <label for="inputRetiro" class="form-label fs-5 text-white">Cantidad a retirar:</label>
                <input type="text" class="form-control" id="inputRetiro" placeholder="$">
            </div>
            <button class="btn btn-success mb-3" type="submit" id="btnRetiro">Confirmar</button>
            <p id="inputRespuesta" class="fs-5"></p>
            <p id="inputMonto" class="fs-5"></p>
        </form>
    </div>
    `;

    mostarHTML(cuerpo);

    retiro.firstElementChild.classList.add('active');
    inicio.firstElementChild.classList.remove('active');
    ingreso.firstElementChild.classList.remove('active');

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

        if(validarCantidad(monto, inputRespuesta, inputMonto)){
            if(validarMayor(resultado, inputRespuesta, inputMonto)){
                transaccionTrue(resultado);
            }
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

    mostarHTML(cuerpo);

    ingreso.firstElementChild.classList.add('active');
    inicio.firstElementChild.classList.remove('active');
    retiro.firstElementChild.classList.remove('active');

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

        if(validarCantidad(monto, inputRespuesta, inputMonto)){
            if(validarMayor(resultado, inputRespuesta, inputMonto)){
                transaccionTrue(Number(saldo)+Number(monto));
            }
        }

    });

});

//Cerrar sesion

btnCerrar.addEventListener('click', () => {
    localStorage.removeItem('correo');
    window.open('index.html', "_self");
});