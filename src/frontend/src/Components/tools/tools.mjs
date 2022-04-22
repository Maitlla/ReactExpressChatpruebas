
// {String} url - Url, {String} name - Name user, {String} password - Password user, {Number} id - Id user
// Un token de acceso es un string que identifica a un usuario, (utilizado por la app para realizar llamadas a la API)

    // Token - para crear autorización, se pasa nombre de usuario y password y genera autorización (devuelve id)
 function authToken(id, password) {
        // En autenticación Basic, usuario y contraseña se separan con ':'
        const authToken = `${id}:${password}`;
        // Y se codifican en Base64
        const base64Token = btoa(authToken);
        //console.log(base64Token);
        return `Basic ${base64Token}`;
 }
export default authToken


