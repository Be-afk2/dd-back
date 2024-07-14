// data  a enviar desde el ejs 
// - url_api
// -token
console.log("funciones_varias uwu")


async function Post(url_peticion, data) {
    const apiUrl = `${url_api}${url_peticion}`;
    return new Promise((resolve, reject) => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response
            }
        })
        .then(data => resolve(data))
        .catch(error => {
            console.log('Hubo un error al llamar a la API:', error);
            reject(error); 
        });
    });
}


async function PostFormData(url_peticion, formData) {
    const apiUrl = `${url_api}${url_peticion}`;
    return new Promise((resolve, reject) => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .then(data => resolve(data))
        .catch(error => {
            console.log('Hubo un error al llamar a la API:', error);
            reject(error);
        });
    });
}

async function Get(url_peticion) {
    const apiUrl = `${url_api}${url_peticion}`
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}` // Agregar el token 
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

async function Delete(url_peticion) {
    const apiUrl = `${url_api}${url_peticion}`
    return new Promise((resolve, reject) => {
        axios.delete(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
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


async function Update(url_peticion) {
    const apiUrl = `${url_api}${url_peticion}`
    return new Promise((resolve, reject) => {
        axios.patch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
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
