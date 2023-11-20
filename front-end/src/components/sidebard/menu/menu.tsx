import { useEffect, useState } from "react";
import MenuItem from "./menuItem/menuItem";
import { ChartBar, FolderSimple, MicrosoftExcelLogo, UsersThree } from "phosphor-react";
import axios from "axios";
import { UseAuth } from "@/hooks/useAuth";


const usuarioMenu = [
    {
        name: "Templates",
        icon: MicrosoftExcelLogo,
        url: "/templates",

    },
    {
        name:"Arquivos",
        icon: FolderSimple,
        url: "/arquivos",

    }

]

const adminMenu = [
    {
        name: "Dashboard",
        icon: ChartBar,
        url: "/admin/dashboard",

    },
    {
        name: "Usuários",
        icon: UsersThree,
        url: "/admin/usuarios",

    },
    {
        name: "Templates",
        icon: MicrosoftExcelLogo,
        url: "/admin/templates",

    },
    {
        name:"Arquivos",
        icon: FolderSimple,
        url: "/arquivos",

    }
]

export default function Menu() {

    const [currentUser, setCurrentUser] = useState<any | null>(null);

    const {user, config} = UseAuth()

    useEffect(() => {
        async function fetchUser ()  {
            try {
                const ip = process.env.NEXT_PUBLIC_IP || "localhost"

                const response =  await axios.get(`http://${ip}:8080/api/usuario/${user?.id}`, config)

                if(response.status === 200){
                    setCurrentUser(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()

    }, []);
    return (
        <div className="pt-5">
            <ul className="flex flex-col justify-center items-center sm:items-stretch gap-2 p-2">
                {currentUser?.isAdmin === true ? 
                    adminMenu.map(({name, icon, url}, index) => (
                        <MenuItem key={index} nome={name} icon={icon} url={url} />
                    ))
                    :
                     usuarioMenu.map(({name, icon, url}, index) => (
                        <MenuItem key={index} nome={name} icon={icon} url={url} />
                    )) 
                }
            </ul>
        </div>
    )
}

        // const userString = localStorage.getItem("currentUser");
        
        // if (userString) {
        //     try {
        //         const user = JSON.parse(userString);
        //         setCurrentUser(user);
        //     } catch (error) {
        //         console.error("Erro ao analisar JSON de usuário do localStorage:", error);
        //     }
        // }










