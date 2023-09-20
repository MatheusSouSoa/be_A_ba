import { useEffect, useState } from "react"
import User from "./user/user"
import Image from "next/image"
import UserProfile from "./user/user"
import { UseAuth } from "@/hooks/useAuth"

interface LoginProps {
    isLoggedIn: boolean
}

export default function Header() {

    const [logged, isLogged] = useState(false)
    const {user} = UseAuth()

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
                    {user ? <UserProfile/> : ""}
                </div>
            </header>
        </div>
    )
}