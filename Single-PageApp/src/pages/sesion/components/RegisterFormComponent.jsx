import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../assets/firebase/config';
import '../../../assets/CSS/Home.CSS'

export const RegisterFormComponent = () => {
    const { register, handleSubmit } = useForm();

    const onSubmitForm = (data) => {
        console.log(data);
        console.log(data.email);
        
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Escribe tu correo" 
                    {...register('email')}
                />
                
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Escribe tu contraseña" 
                    {...register('password')} 
                />
                
                <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirma tu contraseña"
                    {...register('confirmPassword')} 
                />
                
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
