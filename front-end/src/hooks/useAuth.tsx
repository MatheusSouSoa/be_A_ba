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
        isAdmin: boolean,
        permissions: string[]
    } | null,
    handleLogout: () => void
}

export default function AuthProvider({children} : AuthProviderProps) {

    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState(null)
  
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');

        router.push('/').then(() => {
            setUser(null)
        })
    };

    useEffect(() => {
        const storageData = localStorage.getItem("currentUser");
        const usuario = storageData ? JSON.parse(storageData) : null;
    
        if (!usuario && router.asPath !== "/registrar") {
            router.push("/");
            return;
        }
    
        if (usuario) {
            if (usuario.isAdmin === true) {
                usuario.permissions = [
                    "/admin/dashboard",
                    "/admin/templates",
                    "/admin/usuarios",
                    "/admin/usuarios/editar-usuario",
                    "/admin/usuarios/solicitacoes-cadastro",
                    "/arquivos",
                    "/arquivos/meus-arquivos",
                    "/arquivos/validar-arquivo",
                    "/templates",
                    "/templates/cadastrar-template",
                ];
            } else {
                usuario.permissions = [
                    "/templates",
                    "/templates/cadastrar-template",
                    "/arquivos",
                    "/arquivos/meus-arquivos",
                    "/arquivos/validar-arquivo",
                ];
            }
    
            if (!usuario.permissions.includes(router.asPath)) {
                router.push(usuario.permissions[0]);
                return;
            }
        }
    
        setUser(usuario);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
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