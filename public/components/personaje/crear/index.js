var razas_lista = []
var raza_selecionada
var puntos_disponibles = 4
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
    const stack_raza = await Get(`raza/${raza_selecionada.id}`)

    console.table(stack_raza)


    for (let item of stack_raza) {
        crear_elemento_stack(item)
    }

}


function crear_elemento_stack(item) {
    const contenedor_padre = document.getElementById("contenedor_padre_stacks")

    const stack = document.createElement("div")
    stack.classList.add("stacks")

    const nombre = document.createElement("div")
    nombre.classList.add("center")
    nombre.innerText = item.nombre

    const stak = document.createElement("div")
    stak.classList.add("center")
    stak.classList.add("stack_container")
    stak.innerText = item.stack


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
    }

    document.getElementById("titulo_stacks").innerHTML = `Stacks (${puntos_disponibles})`
}

function descontar_contador(id_stack) {
    const contador = document.getElementById("stack_raza_" + id_stack)
    var number = parseInt(contador.innerHTML)


    if (number >  0) {
        number = number - 1
        contador.innerHTML = number
        puntos_disponibles = puntos_disponibles + 1
    }




    document.getElementById("titulo_stacks").innerHTML = `Stacks (${puntos_disponibles})`

}

function mostrr_resumen (){
    
}