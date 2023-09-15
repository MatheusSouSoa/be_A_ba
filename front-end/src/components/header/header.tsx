import { useState } from "react"
import User from "./user/user"
import Image from "next/image"

interface LoginProps {
    isLoggedIn: boolean
}

export default function Header() {

    const [logged, isLogged] = useState(false)

    function setLogged() {
        isLogged(!logged)
    }

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
                    <User/>
                </div>
            </header>
        </div>
    )
}