var afinidades_new = []
var afinidades_selecionada = []
$(document).ready(async function () {
    cargar_stacks(await peticiom_api_normal_get("stack"))
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
    const element = afinidades_new.find((item) => item.id === afinidades_selecionada.id)
    if (element) {
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


function guardar() {

    function appendFormData(formData, data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                // Serializar arrays y objetos a JSON
                if (Array.isArray(data[key]) || typeof data[key] === 'object') {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            }
        }
    }

    const nombre = document.getElementById("input_nombre_raza").value

    const descripcion = document.getElementById("textarea_descripcion").value

    var inputArchivo = document.getElementById("input_foto");


    var formData = new FormData();
    formData.append('image', inputArchivo.files[0]);
    // formData.append('id_usuario', localStorage.getItem("user_id_of_reclutamiento"));
    // formData.append('tipo_doc', select_tipo.options[select_tipo.selectedIndex].value);
    // formData.append('sub_tipo_doc', select_sub_tipo.options[select_sub_tipo.selectedIndex].value);

    const data = {
        nombre: nombre,
        descripcion: descripcion,
        afinidad: afinidades_new
    }

    console.log(JSON.stringify(data))

    appendFormData(formData, data);


    peticiom_api_form_data("raza", formData)

}