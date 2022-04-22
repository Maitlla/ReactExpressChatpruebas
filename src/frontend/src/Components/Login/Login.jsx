// Componente Login()

import { useEffect, useState } from "react";
import authToken from "../tools/tools.mjs";

//const url = "https://web-develop-react-express-chat.herokuapp.com";

const urlGetMensajes = "https://web-develop-react-express-chat.herokuapp.com/messages/";

// Componente Login para logearte (Iniciar Sesión), método POST
function Login({ id, password, idSetter, passwordSetter, tokenSetter, setErrorLog, setAlertText }) {
    //let userToken = null; 
    let userToken = 0;

    // Evento onChange del input text Usuario
    function userIdHandleChange(event) {
        idSetter(event.target.value)
    }

    // Evento onChange del input text Contraseña
    function passwordHandleChange(event) {
        passwordSetter(event.target.value)
    }

    // Petición GET autenticada que devuelve sólo el status
    async function authGetStatus(url, token) { // función asincrona
        const response = await fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: token
                }
            });
        const status = response.status;
        return status;
    }

    // función Inicia Sesión
    function iniciarSesion() {
        if (id === "" || password === "") {
            window.alert("¡El campo no puede quedar vacío!");
            return;
        }

        userToken = authToken(id, password);
        tokenSetter(0);

        // Para Iniciar sesión la autorización se da, si lo que tenemos es un código de estado 200 OK en la solicitud GET de Messages
        authGetStatus(urlGetMensajes, userToken).then(
            statusCode => {
                switch (statusCode) {
                    // Códigos de estado 200 indican que la acción solicitada por el cliente ha sido recibida, entendida, aceptada y procesada correctamente.
                    // Código de estado 200 OK, la solicitud se ha procesado sin problemas y se envían al cliente los datos solicitados.
                    case 200:
                        setErrorLog("Usuario autorizado");
                        tokenSetter(userToken);
                        break;
                    // Códigos de estado 400 Errores del cliente.
                    // Error 400 el servidor no entiende la petición del navegador porque la sintaxis no es correcta.
                    case 400:
                        setErrorLog("Mala petición");
                        break;
                    // Error 401 No autorizado, el cliente requiere la autenticación del servidor.
                    case 401:
                        setErrorLog("NO autorizado, se requiere autenticación válida");
                        break;
                    // Error 403 Este código se devuelve cuando un usuario intenta acceder a algo a lo que no tiene permiso para ver.
                    case 403:
                        setErrorLog("El acceso a ese recurso está prohibido");
                        break;
                    // Error 404 El recurso que solicita el navegador no se encuentra o no está disponible en el servidor.
                    case 404:
                        setErrorLog("No se encontró el recurso solicitado");
                        break;
                    // Error 408 El servidor no recibió la solicitud completa que fue enviada por el navegador en un período de tiempo especificado, por conexión lenta, etc....
                    case 408:
                        setErrorLog("Error de tiempo de espera de solicitud");
                        break;
                    // Error 410 Indica que la URL ha desaparecido. Esa página ya no existe en el servidor.
                    case 410:
                        setErrorLog("La URL no existe");
                        break;
                    // Error 429 El navegador realiza demasiadas peticiones al servidor en un período de tiempo determinado.
                    case 429:
                        setErrorLog("Demasiadas peticiones al servidor");
                        break;
                    // Códigos de estado 500 Errores del servidor.
                    // Error 500 el servidor encontró un problema y no puede procesar la solicitud.
                    case 500:
                        setErrorLog("Error interno del servidor, no se puede procesar la solicitud");
                        break;
                    // Error 502 el servidor está funcionando como un proxy o puerta de enlace, y ha recibido una respuesta inválida desde dicho servidor.
                    case 502:
                        setErrorLog("Proxy o Puerta de enlace incorrecta");
                        break;
                    // Error 503 el servidor no está disponible, por sobrecarga del servidor o por encontrarse este en mantenimiento.
                    case 503:
                        setErrorLog("El servidor no está disponible");
                        break;
                    default:
                        setErrorLog("Error");
                        break;
                }
            }
        );
        setAlertText(true)
    }

    // función Cierra Sesión
    function cerrarSesion() {
        // Se pasa tokenSetter(0) a cero para cerrar la Sesión
        tokenSetter(0);
        setErrorLog("¡Te has desconectado!")
        setAlertText(true)
    }

    return (
        <div className='flex flex-wrap justify-content align-itemsEnd margin-bottom'>
            <div id="login">
                <h1>Inicia Sesión</h1>
                <div className='colFlex'>
                    <input className='em inputSpace' type="text" onChange={userIdHandleChange} value={id} placeholder='Id de usuario' />
                    <input className='em inputSpace' type="text" onChange={passwordHandleChange} value={password} placeholder='Contraseña' />
                    <button className='clikButton bold em marginEntrar inputSpace buttonColor borde-fino' onClick={iniciarSesion}>Entrar</button>
                </div>
            </div>
            <div id="desconectar">
                <h1>Cierra Sesión</h1>
                <div className='colFlex'>
                    <p className="text cursiva bold">¿Quieres salir</p>
                    <p className="text cursiva bold">de la aplicación?</p>
                    <button className='clikButton bold em marginEntrar inputSpace buttonColor borde-fino' onClick={cerrarSesion}>Desconectar</button>
                </div>
            </div>
        </div >
    );

}
export default Login;

// Códigos de estado 100 Códigos informativos, el servidor reconoce la petición iniciada por el buscador y está siendo procesada.
// Códigos de estado 300 Errores por Redirecciones, los más comunes 301 y 302.
// Código de estado 418 Soy una tetera. Este código es devuelto por las teteras que reciben solicitudes para preparar café. También es un chiste del «día de las bromas de abril» de 1998.
// Código de estado 451 No disponible por razones legales, el servidor tiene prohibido otorgar acceso a la solicitud; puede ser una página web censurada oficialmente.

// disabled   => para deshabilitar un campo input

