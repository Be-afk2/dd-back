async function peticiom_api_normal(url_peticion, data) {
    const apiUrl = `${url_api}${url_peticion}`
    return new Promise((resolve, reject) => {
        axios.post(apiUrl, data, {
            headers: {
                "Authorization": `Bearer ${token}` // Agregar el token como Bearer Token
            }
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    // La solicitud fue exitosa (código de estado 2xx)
                    resolve(response.data); // Resolver la promesa con los datos
                } else {
                    console.log(`Error en la llamada a la API: ${response.status} - ${response.statusText}`);
                    reject(`Error en la llamada a la API: ${response.status} - ${response.statusText}`);
                }
            })
            .catch(error => {
                console.log('Hubo un error al llamar a la API:', error);
                reject(error); // Rechazar la promesa con el error
            });
    });

}

async function peticiom_api_form_data(url_peticion, data) {

    const apiUrl = `${url_api}${url_peticion}`
    return new Promise((resolve, reject) => {
        axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    // La solicitud fue exitosa (código de estado 2xx)
                    resolve(response.data); // Resolver la promesa con los datos
                } else {
                    console.log(`Error en la llamada a la API: ${response.status} - ${response.statusText}`);
                    reject(`Error en la llamada a la API: ${response.status} - ${response.statusText}`);
                }
            })
            .catch(error => {
                console.log('Hubo un error al llamar a la API:', error);
                reject(error); // Rechazar la promesa con el error
            });
    });

}


async function peticiom_api_normal_get(url_peticion) {
    const apiUrl = `${url_api}${url_peticion}`
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}` // Agregar el token como Bearer Token
            }
        })
            .then(response => {


                if (response.status >= 200 && response.status < 300) {
                    // La solicitud fue exitosa (código de estado 2xx)
                    resolve(response.data); // Resolver la promesa con los datos
                } else {
                    console.log(`Error en la llamada a la API: ${response.status} - ${response.statusText}`);
                    reject(`Error en la llamada a la API: ${response.status} - ${response.statusText}`);
                }
            })
            .catch(error => {
                console.log('Hubo un error al llamar a la API:', error);
                reject(error); // Rechazar la promesa con el error
            });
    });
}