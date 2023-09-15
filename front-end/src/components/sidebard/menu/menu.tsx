import { useState } from "react";
import MenuItem from "./menuItem/menuItem";
import { ChartBar, FolderSimple, MicrosoftExcelLogo, UsersThree } from "phosphor-react";

const user = {
    permissions: [
        "/admin/templates",
        "/admin/usuarios",
        "/admin/dashboard",
        "/arquivos"
    ]
}

const users = {
    user1: {
        email: "email@example.com",
        senha: "senha",
        nome: "Matheus",
        isAdmin: false,
        permissions: [
            "/templates",
            "/arquivos"
        ]
    },
    user2: {
        email: "user@example.com",
        senha: "senha",
        nome: "Matheus",
        isAdmin: false,
        permissions: [
            "/templates",
            "/arquivos"
        ]
    },
    user3: {
        email: "matheus@email.com",
        senha: "senha123",
        nome: "Matheus",
        isAdmin: true,
        permissions: [
            "/admin/templates",
            "/admin/usuarios",
            "/admin/dashboard",
            "/arquivos"
        ]
    },
}

const menu = [
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
        url: "/templates",

    }
    ,
    {
        name: "Templates",
        icon: MicrosoftExcelLogo,
        url: "/admin/templates",

    }
    ,
    {
        name:"Arquivos",
        icon: FolderSimple,
        url: "/arquivos",

    }
]

export default function Menu() {

    return (
        <div className=" pt-5">
            <ul className="flex flex-col gap-2 p-2">
                {menu.filter(item => users.user3.permissions.includes(item.url) ).map(({name, icon, url}, index) => (
                    <MenuItem key={index} nome={name} icon={icon} url={url} />
                ))}
            </ul>
        </div>
    )
}