const filtro = document.getElementById("select_user")
const filtro2 = document.getElementById("select_personaje")


function comprobar_selects() {
    try {
        const filtro_user_val = filtro.options[filtro.selectedIndex].value
        const filtro_personaje_val = filtro2.options[filtro2.selectedIndex].value



        if (filtro_user_val === "0" ) {
            activar_alerta()
            return false
        }
        return true
    }
    catch {
        activar_alerta()

    }
}

function activar_alerta() {
    const alerta = document.getElementById("alerta")
    alerta.removeAttribute('hidden');
    setTimeout(() => alerta.setAttribute('hidden', true), 3000);
}


async function crear_lista_personajes() {
    const filtro_user_val = filtro.options[filtro.selectedIndex].value

    const data = await Get(`personaje/Get_personaje?user=${filtro_user_val}`)
    const select_personaje = document.getElementById("select_personaje")
    select_personaje.innerHTML = ""

    const crear = document.createElement("option")
    crear.value  = 0
    crear.innerText = "Crear"
    select_personaje.appendChild(crear)

    for (let item of data) {
        const option = document.createElement("option")

        option.value = item.id
        option.innerText = item.nombre

        select_personaje.appendChild(option)
    }
    console.table(data)
}


function mandar_formulario() {
    if (!comprobar_selects()) { return }

    const filtro_user_val = filtro.options[filtro.selectedIndex].value
    const filtro_personaje_val = filtro2.options[filtro2.selectedIndex].value


    const formulario = document.getElementById("formulario_login")
    const input = document.getElementById("data_text")
    const data = {
        id_user: filtro_user_val,
        id_personaje: filtro_personaje_val
    }

    input.value = JSON.stringify(data)
    formulario.submit()

}