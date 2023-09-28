import { useEffect, useState } from "react";
import MenuItem from "./menuItem/menuItem";
import { ChartBar, FolderSimple, MicrosoftExcelLogo, UsersThree } from "phosphor-react";


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

    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
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








