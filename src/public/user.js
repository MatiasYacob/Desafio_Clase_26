

function llamarApi() {
    console.log("llamando Api User");

    fetch('api/users/65b6b7c5caf2da3f3f21dd02', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Corregido 'aplication' a 'application'
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(result => {
        if (result.status === 200) {
            return result.json(); // Devolver el resultado JSON
        } else if (result.status === 401) {
            console.log(result);
            alert("Login Invalido Revisa tus Credenciales");
            throw new Error("Unauthorized"); // Agregar una excepción en caso de error de autorización
        } else {
            throw new Error("Error en la solicitud"); // Manejar otros códigos de estado
        }
    }).then(json => {
        console.log(json);
    }).catch(error => {
        console.error(error.message);
    });
}



console.log('user.js cargado correctamente');
async function logout() {
    try {
        const response = await fetch('/api/sessions/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Puedes enviar datos en el cuerpo si es necesario
            // body: JSON.stringify({ key: 'value' })
        });

        if (response.status === 200) {
            // Redirige a la página de inicio de sesión o a donde desees
            window.location.replace('/users/login');
        } else {
            // Maneja el error de alguna manera
            console.error('Error al cerrar sesión:', response.statusText);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}
llamarApi();