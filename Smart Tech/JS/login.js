const repoOwner = 'tu_usuario';
const repoName = 'tu_repositorio';
const filePath = 'usuarios.json';
const githubToken = 'tu_token_de_acceso';  // Asegúrate de mantener esto privado

// URL para la API de GitHub
const apiUrl = `https://raw.githubusercontent.com/Emiliano-Rodatto-Maravilla/SmartTech/db.json`;

// Función para registrar un nuevo usuario
async function registerUser(newUser) {
    try {
        // Obtener el contenido del archivo JSON desde el repositorio
        let response = await fetch(apiUrl, {
            headers: {
                Authorization: `token ${githubToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        let data = await response.json();
        let content = atob(data.content); // Decodificar el contenido base64
        let users = JSON.parse(content);

        // Agregar el nuevo usuario
        newUser.id = users.length + 1;
        users.push(newUser);

        // Codificar nuevamente el contenido a base64
        let updatedContent = btoa(JSON.stringify(users, null, 2));

        // Actualizar el archivo en GitHub
        let updateResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${githubToken}`,
                Accept: 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: "Añadir nuevo usuario",
                content: updatedContent,
                sha: data.sha  // Necesario para indicar qué versión se está actualizando
            })
        });

        if (updateResponse.ok) {
            alert('Registro exitoso. Ya puedes iniciar sesión.');
        } else {
            alert('Error al registrar usuario.');
        }
    } catch (error) {
        console.error(error);
        alert('Ocurrió un error al registrar el usuario.');
    }
}

// Llamar a la función al registrar un usuario
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    let firstName = document.getElementById('registerFirstName').value;
    let lastName = document.getElementById('registerLastName').value;
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let newUser = {
        firstName,
        lastName,
        email,
        password
    };

    await registerUser(newUser);
});
