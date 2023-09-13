import { useState } from "react"
import User from "./user/user"

export default function Header() {

    const [logged, isLogged] = useState(false)

    function setLogged() {
        isLogged(!logged)
    }

    return (
        <div>
            <header className="flex bg-green-800 h-24 justify-between items-center px-16">
                <div>
                    logo
                </div>
                <div>
                    <User/>
                </div>
            </header>
        </div>
    )
}