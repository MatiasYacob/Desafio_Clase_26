

function llamarApi() {
    console.log("llamando Api User");
    console.log("Llamando a la API para el usuario con ID:", {userId});
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        console.error("El token de autorización no está presente.");
        return;
    }

    fetch(`api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    }).then(result => {
        if (result.status === 200) {
            return result.json();
        } else if (result.status === 401) {
            console.log(result);
            alert("Login Invalido Revisa tus Credenciales");
            throw new Error("Unauthorized");
        } else {
            throw new Error("Error en la solicitud. Código de estado: " + result.status);
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