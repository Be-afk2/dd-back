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
        div_1.innerText = `${item.nombre} :  ${item.val}`
        ////////////////////////////////////////////////////
        const valor_extra_afinidad = document.createElement("span")
        valor_extra_afinidad.classList.add("badge", "badge-primary", "badge-pill")
        valor_extra_afinidad.innerText = 1
        div_2.appendChild(valor_extra_afinidad)
        ///////////////////////////////////////////////////////////
        const valor_extra_objetos = document.createElement("span")
        valor_extra_objetos.classList.add("badge", "badge-success", "badge-pill")
        valor_extra_objetos.innerText = 1
        div_3.appendChild(valor_extra_objetos)
        ///////////////////////////////////////////////////////////
        const valor_total = document.createElement("span")
        valor_total.classList.add("badge", "badge-info", "badge-pill")
        valor_total.innerText = 1
        div_4.appendChild(valor_total)
        div_4.title = "total"
        ///////////////////////////////////////////////////////////
        element.appendChild(div_1)
        element.appendChild(div_2)
        element.appendChild(div_3)
        element.appendChild(div_4)
        contenedor_stacks.appendChild(element)
    }

}