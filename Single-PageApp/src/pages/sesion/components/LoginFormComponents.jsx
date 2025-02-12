import { useForm } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../assets/firebase/config"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../../assets/Context/UserDataContext"

export const LoginFormComponents = () => {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    const onSubmitForm = (data) =>{
        console.log(data)
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            setUser(user)
            alert("Inicio de sesion con exito. bienvenido")
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(error)
        });
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <input type="text" id="email" placeholder="Escribe tu correo" {...register('email')} />
                <input type="password" id="password" placeholder="Escribe tu contraseña" {...register('password')} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

