import { useRouter } from "next/router"
import { CircleNotch } from "phosphor-react"
import { ReactNode, createContext, useContext, useEffect, useState} from "react"

const authContext = createContext({} as AuthProps) 

interface AuthProviderProps {
    children: ReactNode
}

interface AuthProps {
    user: {
        nome: string
        id: number
        email: string,
        senha: string,
        isNew: boolean,
        permissions: string[]
    } | null,
    handleLogout: () => void
}

export default function AuthProvider({children} : AuthProviderProps) {

    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState(null)
  
    const router = useRouter();

    const handleLogout = () => {
        // Remova o currentUser do localStorage
        localStorage.removeItem('currentUser');

        
        // Redirecione para a página de login
        router.push('/').then(() => {
            setUser(null)
        })
    };

    useEffect(() => {
        const storageData = localStorage.getItem("currentUser")
        const usuario = storageData ? JSON.parse(storageData) : null
        if(!usuario) {
            router.push("/")
            return
        }
        // Verifique se o usuário tem acesso à rota "/admin/dashboard"
        if (!usuario.permissions.includes(router.asPath)) {
            // Redirecione para a rota "/templates" se o acesso não for concedido
            router.push("/templates")
            return
        }
        
        setUser(usuario)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [router.asPath]);

    if(isLoading && router.asPath != "/") {
        return (
        <div className="w-screen h-screen grid place-items-center bg-white">
            <CircleNotch className="h-8 w-8 text-yellow-600 animate-spin"/>
        </div>
        )
    }

    return (
        <authContext.Provider value={{user, handleLogout}}>
            {children}
        </authContext.Provider>
    )
        
}

export function UseAuth() {
    return  useContext(authContext)
}