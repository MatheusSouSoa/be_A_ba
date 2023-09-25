import { useEffect, useState } from "react";
import Header from "../header/header";
import Head from "next/head";
import {users} from "../../../test/users/Users"
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "../util/modal/Modal";

// const users = {
//     user1: {
//         email: "email@example.com",
//         senha: "senha",
//         nome: "Matheus",
//         isAdmin: false,
//         permissions: [
//             "/templates",
//             "/arquivos"
//         ]
//     },
//     user2: {
//         email: "user@example.com",
//         senha: "senha",
//         nome: "Matheus",
//         isAdmin: false,
//         permissions: [
//             "/templates",
//             "/arquivos"
//         ]
//     },
//     user3: {
//         email: "matheus@email.com",
//         senha: "senha123",
//         nome: "Matheus",
//         isAdmin: true,
//         permissions: [
//             "/admin/templates",
//             "/admin/usuarios",
//             "/admin/dashboard",
//             "/arquivos"
//         ]
//     },
// }

const user = {
    id: null as number | null,
    email: null as string | null,
    senha: null as string | null,
    nome: null as string | null,
    isAdmin: null as boolean | null,
    isNew: null as boolean | null,
    permissions: [] as string[],
};


export default function PaginaLogin() {

    const [isLogged, setIsLogged] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errs, setErrs] = useState(false)

    const router = useRouter();


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrs(false)

        if (email === "" || senha === "") return false;

        const usuarios = Object.values(users);

        for (const usuario of usuarios) {
            if (usuario.email === email && usuario.senha === senha) {
                setIsLogged(true);
                user.id = usuario.id
                user.nome = usuario.nome
                user.email = usuario.email
                usuario.isAdmin ? user.isAdmin = true : user.isAdmin = false;
                usuario.isNew ? user.isNew = true : user.isNew = false;

                localStorage.setItem("currentUser", JSON.stringify(user));

                if (usuario.isAdmin) {
                    window.location.href = "/admin/dashboard";
                } else {
                    window.location.href = "/templates";
                }

                return;
            }
        }
        setErrs(true)
    };


    return (
        <>
            <Head>
                <title>GreenLight | Login</title>
            </Head>
            <Header />
            <div className="bg-gray-300 bg-opacity-60 bg-[url(/bg-login.png)] bg-center bg-cover bg-no-repeat main-content">
                <div className="bg-gray-300 bg-opacity-60 h-full flex justify-center pt-20">
                    <div className="w-[25%] h-[70%] bg-white rounded-3xl text-zinc-700 text-xl">
                        <form action="" onSubmit={handleSubmit}>
                            <span className={`
                                flex justify-center items-center pt-2 text-red-500
                            `}>
                               { errs == true ? "Email ou senha invalido" : " "}
                            </span>
                            <ul className="flex flex-col p-4 gap-4 justify-center items-center">
                                <li className="flex flex-col gap-2">
                                    <span>Login:</span>
                                    <input 
                                        autoFocus
                                        name="email"
                                        type="text" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="email" 
                                        size={20} 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Senha:</span>
                                    <input 
                                        type="password" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="Sua senha" 
                                        size={20} 
                                        value={senha}
                                        name="senha"
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col">
                                    <button className="px-7 py-2 mt-3 bg-green-800 rounded-2xl text-white font-bold hover:bg-green-600"
                                    type="submit"
                                    >Login</button>
                                    <Link href="/registrar" className="hover:underline mt-4">Criar conta</Link>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
