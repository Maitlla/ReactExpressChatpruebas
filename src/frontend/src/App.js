// Componente App()
import { useState } from "react";
import Login from './Components/Login/Login';
import Messages from './Components/Messages/Messages';
import NewMessage from './Components/NewMessage/NewMessage';
import './App.css';
import SignUp from "./Components/SignUp/SignUp";
import Alerts from "./Components/Alerts/Alerts";

function App() {
  const [id, setId] = useState(0);
  const [password, setPassword ] = useState("");
  const [token, setToken] = useState(0);
  const [ signed, setSigned ] = useState(false);
  const [errorLog, setErrorLog] = useState("");
  const [alertText, setAlertText] = useState(false);

  const url = "https://web-develop-react-express-chat.herokuapp.com";

 
  return (
    <>
      <div className='bg-fondo margin-topNo'>
        <div className='rowGrid'>
        {alertText && <Alerts 
          setErrorLog={setErrorLog}
          setAlertText={setAlertText} 
          errorLog={errorLog}/> }
        { signed === true && <Login 
          setAlertText={setAlertText}
          setErrorLog={setErrorLog} 
          id={id} 
          password={password} 
          idSetter={setId} 
          passwordSetter={setPassword} 
          tokenSetter={setToken} 
          /> }  {/*Renderizado condicional con las llaves - Login (Iniciar Sesión) subcomponente del Componente App()*/}
        { signed === false &&  <SignUp 
          setAlertText={setAlertText}
          setErrorLog={setErrorLog} 
          idSetter={setId} 
          passwordSetter={setPassword} 
          signedSetter={setSigned} 
        /> } {/*SignUp (Registro) subcomponente del Componente App()*/} 
        { token !== 0 && <Messages token={token} />} {/*Messages (ver lista de mensajes) subcomponente del Componente App()*/}
        { token !== 0 && <NewMessage token={token} />} {/*NewMessage (enviar mensaje) subcomponente del Componente App()*/}
        </div>
      </div>
    </>
  );
}

export default App;


// funciona ver mensajes actualizados del chat y enviar mensajes, metiendo id y contraseña a mano
//<Login />
//<Messages id="1649672125202" password="abc123" />
//<NewMessage id="1649672125202" password="abc123" />
