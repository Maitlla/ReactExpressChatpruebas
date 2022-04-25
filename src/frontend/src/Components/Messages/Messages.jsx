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
    async function authGet(urlMensajes, urlUsuarios, token) { // función asincrona
        const response = await fetch(
            urlMensajes,
            {
                headers: { 
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: token
                }
            });
        const data = await response.json();

        fetch(urlUsuarios)
            .then((response)=> response.json())
            .then((datausers)=> {
                setMessages(data.map(
                    (item, idx)=>{
                        const user = datausers.find( items=> items.id === item.source)
                        return ( // Para ver el nombre de usuario y su mensaje, y no el número de id
                        <li className='margin-bottom paddingMensajes bgMensaje colorRed' key={item.time}> {user.name} : {item.content}</li>
                        )
                    }))
                
            });
        return data;
    }

    // ya estamos autorizados y vemos los mensajes actualizados en pantalla
    function updateMessages() {
        if (props.token !== 0){
            authGet(url + '/messages/', url + '/users/', props.token);
        }
    }

    // método setTimeout() o setInterval() para actualizar cada segundo
    useEffect(
        ()=>{setTimeout(updateMessages, 1000)},
    )

    return (
        <div className='colFlex flex-wrap align-content'>
            <h1>Mensajes del Chat</h1>
            <ul className='margin-topNo padding-left list-style'>{messages}</ul>
        </div>
    );
}
export default Messages;


