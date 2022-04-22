import { useEffect } from "react"

function Alerts ({setAlertText, setErrorLog, errorLog}){
    function cleanText(){
        setAlertText(false);
        setErrorLog("")
    }
    useEffect(()=>{setTimeout(cleanText, 5000)})
    return(
        <>
            <div className="alert">
            <h1 className="alertText">{errorLog}</h1>
            </div>
        </>
    )
}
export default Alerts