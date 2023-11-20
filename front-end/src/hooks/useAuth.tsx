import { useRouter } from "next/router"
import { CircleNotch, Cookie } from "phosphor-react"
import { ReactNode, createContext, useContext, useEffect, useState} from "react"
import Cookies from "js-cookie"
import axios from "axios"

const authContext = createContext({} as AuthProps) 

interface AuthProviderProps {
    children: ReactNode
}

interface AuthProps {
    user: any,
    handleLogout: () => void
    handleUser: (id: number, nome: string, email: string, matricula: string, isAdmin:boolean, isNew: boolean) => void
    config: {},
    userIsAdmin: boolean | null,
    userId: number | null
}

export default function AuthProvider({children} : AuthProviderProps) {

    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState<any>(null)

    const [userId, setUserId] = useState<number | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [userMatricula, setUserMatricula] = useState<string | null>(null)
    const [userIsAdmin, setUserIsAdmin] = useState<boolean | null>(null)
    const [userIsNew, setUserIsNew] = useState<boolean | null>(null)
    const [token, setToken] = useState<string | null>(Cookies.get('token') || null)
  
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        Cookies.remove("token")

        router.push('/').then(() => {
            setUser(null)
        })
    };

    useEffect(() => {
        const tk = Cookies.get('token') || null;
        setToken(tk);
    
    }, []);

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };

    const handleUser = (id: number, nome: string, email: string, matricula: string, isAdmin:boolean, isNew: boolean) => {
        setUserId(id) 
        setUserEmail(email)
        setUserMatricula(matricula)
        setUserIsAdmin(isAdmin)
        setUserIsNew(isNew)

        const usuario = {
            id: id,
            nome: nome,
            email: email,
            matricula: matricula,
            isAdmin: isAdmin,
            isNew: isNew
        }
        console.log(usuario)
    }
    
    const fetchUser = async () => {
        try {
            const ip = process.env.NEXT_PUBLIC_IP || "localhost"
            
            const response =  await axios.get(`http://${ip}:8080/api/usuario/${userId}`)
            if(response.status === 200){
                setUser(response.data.user)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const storageData = localStorage.getItem("currentUser");
        const usuario = storageData ? JSON.parse(storageData) : null;

        async function fetchUser ()  {
            try {
                const ip = process.env.NEXT_PUBLIC_IP || "localhost"
                
                const user = await axios.get(`http://${ip}:8080/api/usuario/${usuario.id}`, config)

                if(user.status === 200) {
                    if (usuario) {
                        if (user.data.isAdmin === true) {
                            setUserIsAdmin(true);
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

                        setUser(usuario);
                    }
                    
                }
            } catch (error) {
                console.error(error)
                setUser(null)
                Cookies.remove("token")
                router.push('/')
            }
            
        }
        
        
        const token = Cookies.get("token")
        
        if (!token && router.asPath !== "/registrar") {
            router.push("/");
            return;
        }
        
        if(storageData != null) 
            fetchUser()

    
    
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
        <authContext.Provider value={{user, handleLogout, handleUser, config, userIsAdmin, userId}}>
            {children}
        </authContext.Provider>
    )
        
}

export function UseAuth() {
    return  useContext(authContext)
}