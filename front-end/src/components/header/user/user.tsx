import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function User() {
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        // Recupere o usuário do localStorage
        const userString = localStorage.getItem("currentUser");
        
        if (userString) {
            try {
                const user = JSON.parse(userString);
                setCurrentUser(user);
            } catch (error) {
                console.error("Erro ao analisar JSON de usuário do localStorage:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        // Remova o currentUser do localStorage
        localStorage.removeItem('currentUser');
      
        // Redirecione para a página de login
        router.push('/');
      };
      


    return (
        <div className="flex justify-around gap-5 items-center font-black  text-white ">
            <div className="">
                {currentUser ? (
                    <>
                        <div className="text-2xl cursor-pointer">{currentUser.nome}</div>
                        <div className="flex justify-end text-xs cursor-pointer hover:underline hover:text-red-600 text-zinc-200" onClick={handleLogout}>
                            Sair
                        </div>
                    </>
                ) : (
                    <div>Carregando...</div>
                )}
            </div>
            <div>
                <div className=" rounded-full bg-yellow-500 border-4 w-16 h-16 cursor-pointer overflow-hidden flex justify-center items-end">
                    <Image 
                        src={'/user-profile.webp'}
                        alt="user-profile"
                        width={150}
                        height={100}
                    />
                </div>
            </div>
        </div>
    )
}    