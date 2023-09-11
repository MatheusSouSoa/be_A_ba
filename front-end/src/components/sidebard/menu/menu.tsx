import { useState } from "react";
import MenuItem from "./menuItem/menuItem";

const user = {
    admin: true
}

export default function Menu() {

    return (
        <div className=" pt-5">
            <ul className="flex flex-col gap-2 p-2">
                <MenuItem nome="Dashboard" icon="/painel.png" activeIcon="/painel_active.svg"/>
                <MenuItem nome="Usuarios" icon="/usuarios.png" activeIcon="/usuarios_active.svg"/>
                <MenuItem nome="Templates" icon="/planilha.png" activeIcon=""/>
                <MenuItem nome="Arquivos" icon="/arquivos.svg" activeIcon=""/>
            </ul>
        </div>
    )
}