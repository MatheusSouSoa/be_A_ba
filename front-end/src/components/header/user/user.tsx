import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { User2 } from "lucide-react";
import { User, UserCircle, UserFocus } from "phosphor-react";
import { UseAuth } from "@/hooks/useAuth";

export default function UserProfile() {
    const router = useRouter();
    const {user, handleLogout} = UseAuth()

    return (
        <div className="flex justify-around gap-5 items-center font-black  text-white ">
            <div className="">
                {user ? (
                    <div className="flex flex-col">
                        <div className="text-xl ">{user.nome}</div>
                        <div className=" flex justify-end">
                            <p className="flex  justify-end text-xs cursor-pointer hover:underline hover:text-red-600 text-zinc-200" onClick={handleLogout}>
                                Sair
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>Carregando...</div>
                )}
            </div>
            <div>
                <div className=" rounded-full bg-yellow-500 border-4 w-16 h-16 cursor-pointer overflow-hidden flex justify-center items-center">
                    <User className=" w-40 h-40"/>
                </div>
            </div>
        </div>
    )
}    