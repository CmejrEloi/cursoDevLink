import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/input";
import { FormEvent, useState } from "react";

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(email === '' || password === ''){
            alert("Informa os dados de acesso");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() =>{
            navigate("/admin", {replace: true})
            console.log("Logado com sucesso")
        }).catch((error) => {
            console.log(error);
        })
        
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                    Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>

            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-4">
                <Input
                    type="email"
                    placeholder="Informe seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="h-9 bg-blue-600 text-white rounded border-0 text-lg font-medium" type="submit">
                    Acessar
                </button>
            </form>
        </div>
    )
}