import { useEffect, useState } from "react"
import User from "./user/user"
import Image from "next/image"
import UserProfile from "./user/user"

interface LoginProps {
    isLoggedIn: boolean
}

export default function Header() {

    const [logged, isLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        // Recupere o usuário do localStorage
        const userString = localStorage.getItem("currentUser");
        
        if (userString) {
            try {
                const user = JSON.parse(userString);
                setCurrentUser(user);
                isLogged(true)
            } catch (error) {
                console.error("Erro ao analisar JSON de usuário do localStorage:", error);
            }
        }
        else {
            isLogged(false)
        }
    }, []);


    return (
        <div>
            <header className="flex bg-green-800 h-24 justify-between items-center px-16">
                <div>
                    <Image
                        src={'/logo.png'}
                        width={138}
                        height={132}
                        alt="Logo Site"
                    />
                </div>
                <div>
                    {logged ? <UserProfile/> : ""}
                </div>
            </header>
        </div>
    )
}