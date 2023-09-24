import { useEffect, useState } from "react";
import Header from "../header/header";
import Head from "next/head";
import {users} from "../../../test/users/Users"
import { useRouter } from "next/router";
import Link from "next/link";

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


export default function PaginaCriarConta() {

    const [isLogged, setIsLogged] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [rSenha, setRSenha] = useState("")
    const [matricula, setMatricula] = useState("")
    const [nome, setNome] = useState("")


    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();

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
                user.permissions = usuario.permissions || []


                localStorage.setItem("currentUser", JSON.stringify(user));

                if (usuario.isAdmin) {
                    window.location.href = "/admin/dashboard";
                } else {
                    window.location.href = "/templates";
                }

                return;
            }
        }

        console.log("Usuário não encontrado ou senha incorreta");
    };


    return (
        <>
            <Head>
                <title>VerdeTemplates | Registre-se</title>
            </Head>
            <Header />
            <div className="bg-gray-300 bg-opacity-60 bg-[url(/bg-login.png)] bg-center bg-cover bg-no-repeat main-content">
                <div className="bg-gray-300 bg-opacity-60 h-full flex justify-center items-center ">
                    <div className=" bg-white w-[45%] h-[80%] rounded-3xl text-zinc-700 text-xl">
                        <form action="" >
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
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
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
                                        value={senha}
                                        name="senha"
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Email:</span>
                                    <input 
                                        autoFocus
                                        name="email"
                                        type="text" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="email" 
                                        size={15} 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span>Repetir Senha:</span>
                                    <input 
                                        type="password" 
                                        className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" 
                                        placeholder="Repita sua senha" 
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
                                        value={matricula}
                                        onChange={(e) => setMatricula(e.target.value)}
                                        required
                                    />
                                </li>
                            </ul>
                            <ul className="flex justify-center items-center flex-col gap-5">
                                <li>

                                </li>
                                <li className="flex justify-center items-center gap-5">
                                    <button className="px-7 py-2 mt-3 bg-green-800 rounded-2xl text-white font-bold hover:bg-green-600"
                                    type="submit"
                                    >Criar</button>
                                    <Link href="/" className="py-2 mt-3">
                                        Voltar
                                    </Link>
                                </li>
                                <li className="flex gap-2  justify-center items-center">
                                    <input type="checkbox"/>
                                    <span>Li e concordo com os <span className="underline cursor-pointer">termos</span> de uso</span>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


// const handleSubmit = (e: any) => {
//     e.preventDefault(); 

//     if(email == "" || senha == "" ) return false

//     const usuarios = Object.values(users)

//     let logged = false
//     let user 

//     for(const usuario of usuarios) {
//         if(usuario.email == email){
//             if(usuario.senha == senha){
//                 logged = true
//                 user = usuario
//             }
//             else {
//                 console.log("senha errada")
//             }
//         }
//         else {
//             console.log("Usuario não encontrado")
//         }
//     }
//     if(logged) {
//         if(user?.isAdmin == true) {
//             window.location.href = "/admin/dashboard"
//             return
//         }
//         else if(user?.isAdmin == false )window.location.href = "/templates"
//     }
//   };