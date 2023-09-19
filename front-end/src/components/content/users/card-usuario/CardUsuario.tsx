import { useState } from "react";

interface UsuariosCardProps {
    id: number;
    nome: string;
    email: string;
    isadmin?: boolean;
    buttons?: string[];
    isNew?: boolean;
    pagina: string
}

export default function CardUsuario({id, nome, email, isadmin, buttons, isNew, pagina} : UsuariosCardProps): any {

    const [isAdmin, setIsAdmin] = useState(isadmin || false);
    const [param, setParam] = useState(true);

    function handleRadioChange(event:any) {
        const novoStatus = event.target.value === "admin";
        setIsAdmin(novoStatus);
    }
    console.log("pagina: ",pagina)
    console.log("isNew: ", isNew)

    if(pagina == "cad") {
        if(isNew == false) {
            return console.log("cad: ", isNew)
        }
    }
    if(pagina == "edit") {
        if(isNew == true) {
            return console.log("edit: ", isNew)
        }
    }

    return  (
        <div className="w-full p-4 bg-zinc-100 text-zinc-700 rounded-3xl flex justify-around items-center text-md font-semibold">
            <div className="flex flex-col justify-around items-start gap-2">
                <h2 className="font-black text-2xl">
                    Dados:
                </h2>
                <div className="flex flex-col justify-around gap-1 text-lg font-semibold">
                    <span>Nome: {nome}</span>
                    <span>Email: {email}</span>
                </div>
            </div>
            <div>
                <h2 className="font-black text-2xl">Permissões:</h2>
                <div className="flex flex-col justify-around gap-1 text-lg font-semibold">
                    <label className="cursor-pointer flex gap-2">
                        <input 
                            className="cursor-pointer"
                            type="radio"
                            name={"adminStatus"+id}
                            value="admin"
                            checked={isAdmin}
                            onChange={handleRadioChange}
                        />
                        Administrador
                    </label>
                    <label className="cursor-pointer flex gap-2">
                        <input
                            className="cursor-pointer"
                            type="radio"
                            checked={!isAdmin}
                            name={"adminStatus"+id}
                            value="cadastro"
                            onChange={handleRadioChange}
                        />
                        Cadastro
                    </label>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div>
                    <button className="p-2 px-6 bg-green-800 rounded-2xl font-bold text-white hover:bg-green-600">
                        {buttons?.at(0)}
                    </button>
                </div>
                <div>
                    <button className="p-2 px-5 bg-zinc-600 rounded-2xl font-bold text-white hover:bg-zinc-400">
                        {buttons?.at(1)}
                    </button>
                </div>
            </div>
        </div>
    )
}