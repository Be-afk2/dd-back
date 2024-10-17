const contenedor_stacks = document.getElementById("contenedor_stacks")
$(document).ready( async function () {

    const stacks_this_personaje = await Get("personaje/stacks")

    console.log(token)
    console.log(url_api)
    cargar_stacks(stacks_this_personaje)

})






function cargar_stacks(data) {
    contenedor_stacks.innerHTML = ""
    for (item of data) {
        const element = document.createElement("div")
        element.classList.add("item_of_item_stacks")
        element.style.color = "#"+item.colorLetra;
        element.style.backgroundColor ="#"+item.color;
        console.log(item)
        //////////////////////////////////////////////////
        const div_1 = document.createElement("div")
        const div_2 = document.createElement("div")
        const div_3 = document.createElement("div")
        const div_4 = document.createElement("div")
        div_1.style.width = "100%"
        div_2.style.width = "50%"
        div_3.style.width = "50%"
        div_4.style.width = "50%"
        ///////////////////////////////7
        div_1.innerText = `${item.nombre} :  ${item.valores.total}`
        ////////////////////////////////////////////////////
        // para afinidad
        const valor_extra_afinidad = document.createElement("span")
        valor_extra_afinidad.classList.add("badge", "badge-primary", "badge-pill")
        valor_extra_afinidad.innerText = item.valores.afinidad
        div_2.appendChild(valor_extra_afinidad)
        div_2.title = "valor_extra_afinidad"

        ///////////////////////////////////////////////////////////
        
        const stack_personaje = document.createElement("span")
        stack_personaje.classList.add("badge", "badge-success", "badge-pill")
        stack_personaje.innerText = item.valores.stack_personaje
        div_3.appendChild(stack_personaje)
        div_3.title = "stack_personaje"

        ///////////////////////////////////////////////////////////
        // base
        const valor_base = document.createElement("span")
        valor_base.classList.add("badge", "badge-info", "badge-pill")
        valor_base.innerText = item.valores.base
        div_4.appendChild(valor_base)
        div_4.title = "base"
        ///////////////////////////////////////////////////////////
        element.appendChild(div_1)
        element.appendChild(div_2)
        element.appendChild(div_3)
        element.appendChild(div_4)
        contenedor_stacks.appendChild(element)
    }

}