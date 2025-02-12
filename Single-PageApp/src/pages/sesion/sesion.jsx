import { useState } from "react";
import { LoginFormComponents } from "./components/LoginFormComponents";
import { RegisterFormComponent } from "./components/RegisterFormComponent";
import {Link} from "react-router-dom"
import '../../assets/CSS/Home.CSS'

export const Sesion = () => {
  const [typeForm, setTypeForm] = useState("login") 
  return (
    <div className="form-bottom-container">
        <Link to="/">Regresar</Link>
        <br />
        <div className="button-container">
            <button className="form-button" onClick={() => setTypeForm('Login')}>Login</button>
            <button className="form-button" onClick={() => setTypeForm('SignUp')}>Suscribirse</button>
        </div>
        {/* renderizado condicional */}
        {typeForm === "Login" ? <LoginFormComponents/> : <RegisterFormComponent/>}
    </div>
);

};
    

