import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';


export const Login = () => 
{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event : FormEvent) =>{
        event.preventDefault();

        if(email === '' || password === ''){
            alert('Preencha todos os campos.');
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            console.log("userCredential: ", response);
            navigate("/admin", { replace: true })
        })
        .catch(error => {
            console.log(`Erro ao fazer o login: `, error);
        })
    }
    return (
        <div className="flex flex-col pt-36 items-center w-full h-screen">
            <Link to="/">
                <h1 className="mt-11 mb-7 text-white text-5xl font-bold select-none cursor-pointer">Dev
                <span className="bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent -m-2">Link</span>
                </h1>
            </Link>

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl px-2">
                <Input type="email" value={email} onChange={ e => { setEmail(e.target.value)}} placeholder="Digite o seu email..."/>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite a sua senha..."/>

                <button type="submit" className="h-9 bg-blue-600 rounded-md boder-0 text-lg font-medium text-white">Acessar</button>
            </form>
        </div>
    )
}