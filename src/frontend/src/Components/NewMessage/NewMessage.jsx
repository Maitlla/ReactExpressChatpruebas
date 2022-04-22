// Componente NewMessages(props)
// Se trae el id y el password de function authToken(id, password) que esta en tools.mjs
// si no se hace dispersión ({id, password}), ponemos (props), authToken(props.id, props.password)

import { useState } from "react";
import authToken from "../tools/tools.mjs";

const url = "https://web-develop-react-express-chat.herokuapp.com";

// Enviar un mensaje, método POST
function NewMessage(props) {

    const [newMessage, setNewMessage] = useState("");
    const data = JSON.stringify({ content: newMessage });

    // función autentificación POST
    async function authPost(url, token, data) {
        const response = await fetch(
            url,
            {
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: token
                }
            }
        );
        const responseData = await response.json();
        //console.log(responseData)
    }

    // Evento onChange en React, cada vez que se escribe una letra en el textarea se invoca el método handleChange
    // y este manda el valor capturado para ser guardado, a la variable de estado que está asignada al atributo value
    // y se muestra en el textarea
    function newMessagehandleChange(event) {
        setNewMessage(event.target.value);
    }

    // Evento onClick del button, para enviar el mensaje
    function sendMessageTextarea() {
        //const token = authToken(props.id, props.password);
        //const data = JSON.stringify({content: newMessage});
        //console.log(data);
        //setNewMessage(token, data)
        if (props.token !== 0) {
            authPost(url + "/message/", props.token, data);
        } else {
            window.alert("¡Usuario no conectado! " + " ¡Tienes que Iniciar Sesión!")
        }
    }

    return (
        <div className='colFlex flex-wrap align-content colorBlue'>
            <h1 className="text">Envia un mensaje</h1>
            <textarea className='fontTextarea colorBlue heightTextarea widthTextarea' onChange={newMessagehandleChange} value={newMessage}></textarea>
            <button className='colorBlue bold em buttonColor borde-fino' onClick={sendMessageTextarea} value={newMessage}>Enviar</button>
        </div>
    );
}
export default NewMessage;