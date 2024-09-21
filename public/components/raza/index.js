var afinidades_new = []
var afinidades_selecionada = []
var paguina = 1
$(document).ready(async function () {
    cargar_stacks(await Get("stack"))
    await cargar_datos(paguina)
})

function cambiar_vista(vista) {
    const boton = document.getElementById("boton_crear")

    switch (vista) {
        case 1:
            boton.innerText = "Crear"
            boton.onclick = function () {
                cambiar_vista(2)
            }
            document.getElementById(`contenedor_padre_${vista}`).style.display = "none"
            document.getElementById(`contenedor_padre_${vista + 1}`).style.display = "flex"
            document.getElementById("boton_guardar_creacion").removeAttribute("hidden")
            break;
        case 2:
            boton.innerText = "Historial"
            boton.onclick = function () {
                cambiar_vista(1)
            }
            document.getElementById(`contenedor_padre_${vista}`).style.display = "none"
            document.getElementById(`contenedor_padre_${vista - 1}`).style.display = "flex"
            document.getElementById("boton_guardar_creacion").setAttribute("hidden", true)
            break;
    }


}

function cargar_a_la_lista(nombre, valor) {
    const contenedor_afinidades = document.getElementById("contenedor_afinidades")
    contenedor_afinidades.innerText = `${contenedor_afinidades.innerText}  ${nombre} : ${valor} `
}

function asignar_afinidad() {
    const valor_stack_new = document.getElementById("valor_stack_new")
    if (afinidades_selecionada.length === 0) { return }

    const element = afinidades_new.find((item) => item.stack_id === afinidades_selecionada.id)

    if (element) {

        return
    }
    else {

        afinidades_new.push({
            stack_id: afinidades_selecionada.id,
            nombre: afinidades_selecionada.stack,
            stack: parseInt(valor_stack_new.value),
        })
        cargar_a_la_lista(afinidades_selecionada.stack, valor_stack_new.value)
        valor_stack_new.value = 0
    }
}

function cargar_stacks(stacks) {
    const contenedor_opciones = document.getElementById("contenedor_opciones")
    contenedor_opciones.innerHTML = ""
    for (let item of stacks) {
        // <a class="dropdown-item" href="#">Action</a>
        const element = document.createElement("a")
        element.classList.add("dropdown-item")
        element.href = "#"
        element.innerText = item.stack
        element.onclick = function () {
            afinidades_selecionada = item
        }
        contenedor_opciones.appendChild(element)

    }
}


function cargar_foto(input) {
    const foto = document.getElementById("img_new_raza")
    console.log(input)

    const file = input.files[0];

    // Crear una URL para el archivo subido
    const reader = new FileReader();

    // Definir la función de carga del archivo
    reader.onload = function (e) {
        // Asignar la URL creada a la imagen
        foto.src = e.target.result;
    };

    // Leer el archivo como una URL de datos
    reader.readAsDataURL(file);

}

function limpiar_guardar() {
    const nombre = document.getElementById("input_nombre_raza")
    const descripcion = document.getElementById("textarea_descripcion")
    const img_new_raza = document.getElementById("img_new_raza")
    const photoInput = document.getElementById('input_foto');
    const contenedor_afinidades = document.getElementById('contenedor_afinidades');
    const input_experiencia_nivel =document.getElementById("input_experiencia_nivel")
    const input_experiencia_derrotar = document.getElementById("input_experiencia_derrotar")


    contenedor_afinidades.innerHTML = ""
    nombre.value = ""
    descripcion.value = ""
    img_new_raza.src = ""

    photoInput.value = ""

    input_experiencia_derrotar.value = ""
    input_experiencia_nivel.value= ""

    afinidades_new = []
    afinidades_selecionada = []
}

async function guardar() {
    const nombre = document.getElementById("input_nombre_raza").value
    const descripcion = document.getElementById("textarea_descripcion").value
    const input_experiencia_nivel = document.getElementById("input_experiencia_nivel").value
    const input_experiencia_derrotar = document.getElementById("input_experiencia_derrotar").value

    const data = {
        nombre: nombre,
        descripcion: descripcion,
        afinidad: afinidades_new,
        xp_recompenza: parseInt(input_experiencia_derrotar),
        xp_nivel: parseInt(input_experiencia_nivel)
    }

    console.log("data", data)

    var new_raza
    try{
        new_raza = await Post("raza", data)        
    }
    catch(e){
        console.log("error al dar foto")
        console.log(e)
        return
    }
    console.log("new_raza", new_raza)

    const photoInput = document.getElementById('input_foto');
    const formData = new FormData();
    console.log("photoInput.files[0]", photoInput.files[0])
    formData.append('image', photoInput.files[0]);
    formData.append('id_raza', new_raza);


    try {
        await PostFormData('raza/foto', formData)
       
    }
    catch (e) {
        console.log("error_foto")
        console.log(e)
    }

    limpiar_guardar()
}


// funciones para cargar_datos libro
function cambiar_numero_pag(paguina) {

    const paguina_1 = document.getElementById("paguina_1_paguina")
    const paguina_2 = document.getElementById("paguina_2_paguina")
    const paguina_pro = paguina * 2
    paguina_1.innerHTML = paguina_pro - 1
    paguina_2.innerHTML = paguina_pro
    return paguina_pro
}

function cargar_imagenes(img1, id_foto) {
    const foto_1 = document.getElementById(id_foto)


    foto_1.src = img1

}

function cargar_datos_texto(raza1, id_descripcion, id_nombree) {

    const descripcion_1 = document.getElementById(id_descripcion)

    descripcion_1.innerHTML = raza1.descripcion

    const nombre_1 = document.getElementById(id_nombree)

    nombre_1.innerHTML = raza1.nombre
}

function limpiar_paguina(id_foto,id_descripcion,id_nombre,id_afinidad){

    const nombre = document.getElementById(id_nombre)
    const descripcion = document.getElementById(id_descripcion)
    const foto = document.getElementById(id_foto)
    const afinidad = document.getElementById(id_afinidad)

    nombre.innerHTML=""
    descripcion.innerHTML=""
    foto.src=""
    afinidad.innerHTML=""
}

function cargar_afinidad(afinidades,id_afinidad){

    const afinidad = document.getElementById(id_afinidad)
    afinidad.innerHTML = ""

    for(let item of afinidades){
        afinidad.innerHTML = `${item.stack_nombre} = ${item.stack} ` + afinidad.innerHTML 
    }
}
    

function bloquar_desbloquear_boton(bloquear,id_boton){


    const boton = document.getElementById(id_boton)
    if(bloquear){
        boton.style.display = "none"
    }else{
        boton.style.display = "block"
    }
}


async function cargar_datos(paguina) {

    const data = await Get(`raza/v2?paguina=${paguina}&cantidad=${2}`)
    console.log(data.data_proces)
    const ultima_pag = cambiar_numero_pag(paguina)

    if(paguina === 1){
        bloquar_desbloquear_boton(true,"boton_cambiar_paguina_1")
    }
    else{
        bloquar_desbloquear_boton(false,"boton_cambiar_paguina_1")
    }

    cargar_imagenes(data.data_proces[0].foto, "paguina_1_foto")
    cargar_datos_texto(data.data_proces[0], "paguina_1_descripcion", "paguina_1_nombre")
    cargar_afinidad(data.data_proces[0].afinidades,"paguina_1_afinidad")

    if (data.data_proces.length === 2) {
        cargar_imagenes(data.data_proces[1].foto, "paguina_2_foto")
        cargar_datos_texto(data.data_proces[1], "paguina_2_descripcion", "paguina_2_nombre")
        cargar_afinidad(data.data_proces[1].afinidades,"paguina_2_afinidad")
        bloquar_desbloquear_boton(false,"boton_cambiar_paguina_2")

    }else{
        limpiar_paguina("paguina_2_foto","paguina_2_descripcion","paguina_2_nombre","paguina_2_afinidad")
        bloquar_desbloquear_boton(true,"boton_cambiar_paguina_2")
    }

    console.log(data.total)
    if(ultima_pag >= data.total){
        bloquar_desbloquear_boton(true,"boton_cambiar_paguina_2")
    }

}

async function cambiar_paguina(op) {

    switch (op) {
        case 1:
            paguina++
            break;
        case 2:
            paguina--
            break;
    }

    if(paguina === 0){
        paguina = 1
        return
    }
    await cargar_datos(paguina)
}



