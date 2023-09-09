import { useState } from "react";
import MenuItem from "./menuItem/menuItem";

const user = {
    admin: true
}

export default function Menu() {

    const [active, setActive] = useState("Dashboard")

    function setLiActive(active: boolean): void {
        setActive
    }

    return (
        <div className=" pt-5">
            <ul className="flex flex-col gap-2 p-2">
                <MenuItem nome="Dashboard" icon="/painel.png" active/>
                <MenuItem nome="Usuarios" icon="/usuarios.png" />
                <MenuItem nome="Templates" icon="/planilha.png" />
                <MenuItem nome="Arquivos" icon="/arquivos.svg" />
            </ul>
        </div>
    )
}