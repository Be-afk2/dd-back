var razas_lista = []
var raza_selecionada
var puntos_disponibles = 4
var stack_raza
$(document).ready(async function () {




    await cargar_razas()

    limpiar_inputs()
    document.getElementById("titulo_stacks").innerHTML = `Stacks (${puntos_disponibles})`

})

function limpiar_inputs() {

    document.getElementById("input_nombre").value = ""
    document.getElementById("input_raza").value = ""


}

async function cargar_razas() {

    const razas = await Get("raza/mini")
    razas_lista = razas
    const lista = document.getElementById("opciones_list")
    lista.innerHTML = ""
    for (let item of razas) {

        const option = document.createElement("option")
        option.value = item.nombre
        option.innerText = item.nombre
        option.setAttribute('data-id', item.id);
        lista.appendChild(option)
    }
}

document.getElementById('input_raza').addEventListener('input', async function () {
    const value = this.value;
    const options = document.getElementById('opciones_list').children;
    puntos_disponibles = 4
    document.getElementById("titulo_stacks").innerHTML = `Stacks (${puntos_disponibles})`
    for (let option of options) {
        if (option.value === value) {
            raza_selecionada = razas_lista.filter(item => item.id == option.getAttribute('data-id'))[0]
            await cargar_stacks()
            break;
        }
    }
});

async function cargar_stacks() {
    const contenedor_padre = document.getElementById("contenedor_padre_stacks")
    contenedor_padre.innerHTML = ""
    stack_raza = await Get(`raza/${raza_selecionada.id}`)

    console.table(stack_raza)

    cargar_cabecera()

    for (let item of stack_raza) {
        crear_elemento_stack(item)
    }

}

function cargar_cabecera() {

    const contenedor_padre = document.getElementById("contenedor_padre_stacks")

    const stack = document.createElement("div")
    stack.classList.add("stacks")

    ////

    const nombre = document.createElement("div")
    nombre.classList.add("center")
    nombre.innerText = "-----"

    ////


    const stak = document.createElement("div")
    const stak_2 = document.createElement("div")

    stak.classList.add("center")
    stak.classList.add("stack_container")
    stak_2.classList.add("stack_container")
    stak_2.classList.add("center")

    stak.innerText = "Afinidad"
    stak_2.innerText = "Base"

    ////
    const boton = document.createElement("div");
    boton.className = "counter-container";

    ////

    const botonMenos = document.createElement("button");
    botonMenos.onclick = function () {

    }
    botonMenos.textContent = "-";


    // Crear el span para mostrar el valor
    const spanValor = document.createElement("span");
    spanValor.id = 0
    spanValor.textContent = "0";

    // Crear el botón de incremento
    const botonMas = document.createElement("button");
    botonMas.onclick = function () {

    }
    botonMas.textContent = "+";

    // Añadir los elementos al contenedor principal
    boton.appendChild(botonMenos);
    boton.appendChild(spanValor);
    boton.appendChild(botonMas);

    ////

    stack.appendChild(nombre)
    stack.appendChild(stak)
    stack.appendChild(stak_2)
    stack.appendChild(boton)


    contenedor_padre.appendChild(stack)
}

function crear_elemento_stack(item) {
    const contenedor_padre = document.getElementById("contenedor_padre_stacks")

    const stack = document.createElement("div")
    stack.classList.add("stacks")

    const nombre = document.createElement("div")
    nombre.classList.add("center")
    nombre.innerText = item.nombre

    const stak = document.createElement("div")
    const stak_2 = document.createElement("div")

    stak.classList.add("center")
    stak.classList.add("stack_container")
    stak_2.classList.add("stack_container")
    stak_2.classList.add("center")

    stak.innerText = item.stack
    stak_2.innerText = item.base


    const boton = document.createElement("div");
    boton.className = "counter-container";

    // Crear el botón de decremento
    const botonMenos = document.createElement("button");
    botonMenos.onclick = function () {
        descontar_contador(item.id)
    }
    botonMenos.textContent = "-";


    // Crear el span para mostrar el valor
    const spanValor = document.createElement("span");
    spanValor.id = "stack_raza_" + item.id;
    spanValor.textContent = "0";

    // Crear el botón de incremento
    const botonMas = document.createElement("button");
    botonMas.onclick = function () {
        aumenatar_contador(item.id)
    }
    botonMas.textContent = "+";

    // Añadir los elementos al contenedor principal
    boton.appendChild(botonMenos);
    boton.appendChild(spanValor);
    boton.appendChild(botonMas);


    stack.appendChild(nombre)
    stack.appendChild(stak)
    stack.appendChild(stak_2)
    stack.appendChild(boton)


    contenedor_padre.appendChild(stack)

}




function aumenatar_contador(id_stack) {
    const contador = document.getElementById("stack_raza_" + id_stack)
    var number = parseInt(contador.innerHTML)

    if (puntos_disponibles > 0) {
        puntos_disponibles = puntos_disponibles - 1
        number = number + 1
        contador.innerHTML = number
        ocultar_resumen()
    }
    if (puntos_disponibles === 0) {

        mostrar_resumen()
    }

    document.getElementById("titulo_stacks").innerHTML = `Stacks (${puntos_disponibles})`
}

function descontar_contador(id_stack) {
    const contador = document.getElementById("stack_raza_" + id_stack)
    var number = parseInt(contador.innerHTML)
    ocultar_resumen()

    if (number > 0) {
        number = number - 1
        contador.innerHTML = number
        puntos_disponibles = puntos_disponibles + 1
    }




    document.getElementById("titulo_stacks").innerHTML = `Stacks (${puntos_disponibles})`

}

function mostrar_resumen() {
const contenedor_padre = document.getElementById("resumen_stack")
const contenedor_padre_personaje = document.getElementById("resumen_personaje")

contenedor_padre.innerHTML = ""
contenedor_padre_personaje.innerHTML = ""
    for (let item of stack_raza) {
        crear_stack_resumen(item,contenedor_padre)
    }

    crear_personaje_resumen(contenedor_padre_personaje,"input_nombre")
    crear_personaje_resumen(contenedor_padre_personaje,"input_raza")
    console.log("resumen")
}



function crear_stack_resumen(item,contenedor_padre) {

    //     <div class="stacks">
    //          <div class="center">Vida</div>
    //          <div class="center stack_container">0</div>
    //     </div>


    const stack = document.createElement("div")
    stack.classList.add("stacks")

    //////
    const nombre = document.createElement("div")
    nombre.classList.add("center")
    nombre.innerText = item.nombre
    /////


    const stak = document.createElement("div")
    stak.classList.add("center")
    stak.classList.add("stack_container")

    stack_agregado = document.getElementById(`stack_raza_${item.id}`)
    stak.innerText = item.stack + item.base + parseInt(stack_agregado.innerHTML)

    stack.appendChild(nombre)
    stack.appendChild(stak) 
    contenedor_padre.appendChild(stack)
}

function ocultar_resumen(){
    const contenedor_padre = document.getElementById("resumen_stack")
    const resumen_personaje = document.getElementById("resumen_personaje")

    contenedor_padre.innerHTML = ""
    resumen_personaje.innerHTML = ""
}

function crear_personaje_resumen(contenedor_padre,id){

    

    const stack = document.createElement("div")
    stack.classList.add("stacks")
    const nombre = document.createElement("div")


    nombre.classList.add("center")
    nombre.innerText = document.getElementById(id).value
    console.log(document.getElementById(id))


    stack.appendChild(nombre)
    contenedor_padre.appendChild(stack)

}