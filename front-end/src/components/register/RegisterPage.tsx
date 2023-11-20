import { useEffect, useState } from "react";
import Header from "../header/header";
import Head from "next/head";
import {users} from "../../../test/users/Users"
import { useRouter } from "next/router";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import 'dotenv/config'

const user = {
    id: null as number | null,
    email: null as string | null,
    senha: null as string | null,
    nome: null as string | null,
    isAdmin: null as boolean | null,
    isNew: null as boolean | null,
    permissions: [] as string[],
};


export default function PaginaCriarConta() {

    const [isLogged, setIsLogged] = useState(false)
    const [rSenha, setRSenha] = useState("")
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        matricula: "",
    });
    
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("")
    };
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (formData.senha !== rSenha) {
            setError("As senhas não correspondem.");
            return;
        }
    
        const ip = process.env.NEXT_PUBLIC_IP || "localhost"
        try {
            const response = await axios.post(`http://${ip}:8080/api/usuario`, formData); 
            console.log("Resposta do servidor:", response.data);
            router.push("/")
        } catch (error) {
            if ((error as AxiosError).isAxiosError) {
                const axiosError = error as AxiosError;
                console.error(axiosError);
                if (axiosError.response && axiosError.response.status === 409) {
                setError("Email ou matricula já está em uso.");
                } else {
                setError("Erro ao registrar usuário. Tente novamente mais tarde.");
                }
            }
          }
      };


    const router = useRouter();

    return (
        <>
            <Head>
                <title>VerdeTemplates | Registre-se</title>
            </Head>
            <Header />
            <div className="bg-gray-300 bg-opacity-60 bg-[url(/bg-login.png)] bg-center bg-cover bg-no-repeat main-content">
                <div className="bg-gray-300 p-2 bg-opacity-60 h-full flex justify-center items-center ">
                    <div className=" bg-white pb-5 rounded-3xl text-zinc-700 text-xl">
                        <form onSubmit={handleSubmit} >
                            <ul className="grid grid-cols-2 p-4 gap-4">
                                <li className="flex flex-col gap-2">
                                    <span>Nome:</span>
                                    <input 
                                        autoFocus
                                        name="nome"
                                        type="text" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="nome completo" 
                                        size={15} 
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Senha:</span>
                                    <input 
                                        type="password" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="Sua senha" 
                                        size={15} 
                                        value={formData.senha}
                                        name="senha"
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Email:</span>
                                    <input 
                                        autoFocus
                                        name="email"
                                        type="email" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="email" 
                                        size={15} 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Repetir Senha:</span>
                                    <input 
                                        type="password" 
                                        className={`outline-none border-2 rounded-2xl bg-zinc-100 px-2
                                        `} 
                                        placeholder={error !=  "" ? "As senhas precisam ser iguais" : "Repita sua senha " }
                                        size={15} 
                                        value={rSenha}
                                        name="senha"
                                        onChange={(e) => setRSenha(e.target.value)}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Matrícula:</span>
                                    <input 
                                        autoFocus
                                        name="matricula"
                                        type="text" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="sua matricula" 
                                        size={15} 
                                        value={formData.matricula}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                            </ul>
                            <ul className="flex justify-center items-center flex-col gap-5">
                                <li className={` ${error ==  "" ? "" : "block"} text-red-500 `}>
                                    {error == "" ? " " : error }
                                </li>
                                <li className="flex justify-center items-center gap-5">
                                    <button className="px-7 py-2 mt-3 bg-green-800 rounded-2xl text-white font-bold hover:bg-green-600"
                                    type="submit"
                                    >Criar</button>
                                    <Link href="/" className="py-2 mt-3">
                                        Voltar
                                    </Link>
                                </li>
                                {/* <li className="flex gap-2  justify-center items-center">
                                    <input type="checkbox"/>
                                    <span>Li e concordo com os <span className="underline cursor-pointer">termos</span> de uso</span>
                                </li> */}
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

