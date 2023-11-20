import { useEffect, useState } from "react";
import Header from "../header/header";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import 'dotenv/config'
import { UseAuth } from "@/hooks/useAuth";
import Cookies from 'js-cookie'


export default function PaginaLogin() {

    const {user, handleUser, config} = UseAuth() 

    const [errs, setErrs] = useState(false)
    const [msgErr, setMsgErr] = useState("")

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setMsgErr("")
        setErrs(false)
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const ip = process.env.NEXT_PUBLIC_IP || "localhost"
        try {
            const response = await axios.post(`http://${ip}:8080/api/usuario/login`, {
            email: formData.email,
            senha: formData.senha,
          });
    
          if (response.status === 200) {
            const usuario = response.data.user;

            const userObj = {
                nome: usuario.nome,
                id: usuario.id,
            }

            const userJSON = JSON.stringify(userObj);

            localStorage.setItem("currentUser", userJSON);

            handleUser(usuario.id, usuario.nome, usuario.email, usuario.matricula, usuario.isAdmin, usuario.isNew)

            if(usuario.isNew){
                setMsgErr("Acesso negado. Contate o administrador")
                setErrs(true)
                return
            }

            if(user){
                user.id = usuario.id
                user.nome = usuario.nome
                user.isAdmin = usuario.isAdmin
            }

            Cookies.set('token', response.data.token)

            if (usuario.isAdmin) {
                window.location.href = "/admin/dashboard";
            } else {
                window.location.href = "/templates";
            }
          } else {
            setMsgErr("Erro ao fazer login. Tente novamente mais tarde.");
            setErrs(true)
          }
        } catch (error:any) {
          if (error.response && error.response.status === 401) {
            setMsgErr("Email ou senha incorretos.");
            setErrs(true)
          } else {
            setMsgErr("Erro ao fazer login. Tente novamente mais tarde.");
            setErrs(true)
          }
          console.error(error);
        }
      };

    // const handleSubmit1 = (e: any) => {
    //     e.preventDefault();
    //     setErrs(false)

    //     if (email === "" || senha === "") return false;

    //     const usuarios = Object.values(users);

    //     for (const usuario of usuarios) {
    //         if (usuario.email === email && usuario.senha === senha) {

    //             if(usuario.isNew){
    //                 setMsgErr("Acesso negado. Contate o administrador")
    //                 setErrs(true)
    //                 return
    //             }

    //             setIsLogged(true);
    //             usuario.isAdmin ? user.isAdmin = true : user.isAdmin = false;

    //             localStorage.setItem("currentUser", JSON.stringify(user));

    //             if (usuario.isAdmin) {
    //                 window.location.href = "/admin/dashboard";
    //             } else {
    //                 window.location.href = "/templates";
    //             }

    //             return;
    //         }
    //     }
    //     setErrs(true)
    //     setMsgErr("Email ou senha invalidos")
    // };

    return (
        <>
            <Head>
                <title>GreenLight | Login</title>
            </Head>
            <Header />
            <div className="bg-gray-300 bg-opacity-60 bg-[url(/bg-login.png)] bg-center bg-cover bg-no-repeat main-content">
                <div className="bg-gray-300 bg-opacity-60 h-full flex justify-center items-center pt-20">
                    <div className=" mb-20 h-auto bg-white rounded-3xl text-zinc-700 text-xl">
                        <form action="" onSubmit={handleSubmit}>
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
                                        value={formData.email}
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
                                        size={20} 
                                        value={formData.senha}
                                        name="senha"
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <li className="flex flex-col">
                                    <button className="px-7 py-2 mt-3 bg-green-800 rounded-2xl text-white font-bold hover:bg-green-600"
                                    type="submit"
                                    >Login</button>
                                    <Link href="/registrar" className="hover:underline mt-4">Criar conta</Link>
                                </li>
                                <li className="flex justify-center items-center w-full">
                                    <span className={`
                                        flex justify-center items-center pt-2 text-red-500 text-center text-sm
                                    `}>
                                    { errs == true ? msgErr : " "}
                                    </span>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
