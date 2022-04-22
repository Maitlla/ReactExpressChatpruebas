const host = "https://web-develop-react-express-chat.herokuapp.com"
const data = {
	"userName": "Maria",
	"password": "abc123"
}

// Login users
const htmlPostLogin = document.querySelector("#postLogin");
const htmlLoginBoton = document.querySelector("#loginBoton");
// Update users
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");
// Send message
const htmlPostMessage = document.querySelector("#postMessage");
const htmlMessageBoton = document.querySelector("#messageBoton");
// Update message
const htmlGetMessages = document.querySelector("#getMessages");
const htmlUpdateBoton = document.querySelector("#updateBoton");

// con POST
// Login de usuario
async function post(url, data) {
    const response = await fetch(
        url,
        {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    const responseData = await response.json();
    console.log(responseData);
}

function authToken(id, secret) {
    // En autenticación Basic, usuario y contraseña se separan con ':'
    const authToken = `${id}:${secret}`;
    // Y se codifican en Base64
    const base64token = btoa(authToken);
    return `Basic ${base64token}`;
}

                      // id usuario  contraseña usuario
let token = authToken(1649066943349, "abc123");

// con GET
// Actualizar la lista de usuarios

async function get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getUsers () {
    const users = await get(host + "/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};

// con POST
// para mandar un mensaje
async function authPost(url, token, data) {
    data = JSON.stringify({content: "mi mensaje"});
    const response = await fetch(
        url,
        {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
    const responseData = await response.json();
    return responseData;
}

// con GET
// Actualizar la lista de mensajes
async function authGet(url, token) {
    const response = await fetch(
        url,
        { 
            headers: {
                Authorization: token
            }
        }
    );
    const data = await response.json();
    console.log(data);
    return data;
}

// función para el login
function loginBotonClickHandler() {
    post(host + "/login/", JSON.stringify(data));
}

// función que nos devuelve la lista actualizada de usuarios (en pantalla)
function updateButtonClickHandler() {
    getUsers();
}

// función para enviar un mensaje
function messageBotonClickHandler() {
    const result = authPost(host + "/message/", token, JSON.stringify(data));
    result.then(
        (responseData) => {
            htmlPostMessage.innerText = JSON.stringify(responseData);
        }
    )
}

// función que devuelve la lista actualizada de mensajes (por consola)
function updateBotonClickHandler() {
    authGet(host + "/messages/", token);
}

// Evento botón
htmlLoginBoton.addEventListener("click", loginBotonClickHandler)
htmlUpdateButton.addEventListener("click", updateButtonClickHandler)
htmlMessageBoton.addEventListener("click", messageBotonClickHandler)
htmlUpdateBoton.addEventListener("click", updateBotonClickHandler)

