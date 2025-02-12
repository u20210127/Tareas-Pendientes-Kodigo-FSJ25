import { createContext, useState } from "react";

//crear mi contexto(el ambiente donde va a funcionar la informacion)
export const UserContext = createContext(null); // Agregamos export aquí

//crear mi proveedor (distribuye info(el valor que le damos))
export const MyProvider = ({children}) => {
    const [user, setUser] = useState(null); // Corregimos la desestructuración del useState
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
