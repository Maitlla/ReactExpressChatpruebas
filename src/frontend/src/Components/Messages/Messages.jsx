// Componente Messages(props)
// Se trae el id y el password de function authToken(id, password) que esta en tools.mjs
// si no se hace dispersión ({id, password}), ponemos (props), authToken(props.id, props.password)

import { useEffect, useState } from "react";
import authToken from "../tools/tools.mjs";

const url = "https://web-develop-react-express-chat.herokuapp.com";

// Actualizar y ver lista de mensajes, método GET
function Messages(props) {
    const [messages, setMessages] = useState("");
    const data = JSON.stringify({content: messages});

    // función autentificación GET
    async function authGet(url, token) { // función asincrona
        const response = await fetch(
            url,
            {
                headers: { 
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: token
                }
            });
        const data = await response.json();
        // para verlo bonito
        const datafull = data.map(
            (item)=><li className='margin-bottom bgMensaje colorRed' key={item.time}>Usuario: {item.source} | Mensaje: {item.content}</li>
        )
        setMessages(datafull)
        //console.log(data);
        return data;
    }

    // ya estamos autorizados y vemos los mensajes actualizados en pantalla
    function updateMessages() {
        if (props.token !== 0){
            authGet(url + '/messages/', props.token);
        }
    }

    // método setTimeout() o setInterval() para actualizar cada segundo
    useEffect(
        ()=>{setTimeout(updateMessages, 1000)},
    )

    return (
        <div className='colFlex flex-wrap align-content'>
            <h1>Mensajes del Chat</h1>
            <h3 className='bold'>Mensajes: </h3>
            <ul className='margin-topNo list-style'>{messages}</ul>
        </div>
    );
}
export default Messages;


