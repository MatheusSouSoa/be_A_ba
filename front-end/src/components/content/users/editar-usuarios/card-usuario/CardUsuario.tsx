import { useState } from "react";

interface UsuariosCardProps {
    id: number;
    nome: string;
    email: string;
    isadmin?: boolean;
}

export default function CardUsuario({id, nome, email, isadmin} : UsuariosCardProps) {

    const [isAdmin, setIsAdmin] = useState(isadmin);

    function handleRadioChange(event:any) {
        const novoStatus = event.target.value === "admin";
        setIsAdmin(novoStatus);
    }

    return  (
        <div className="w-full p-4 bg-zinc-100 text-zinc-700 rounded-3xl flex justify-around items-center">
            <div className="flex flex-col justify-around items-start gap-2">
                <h2 className="font-bold">
                    Dados:
                </h2>
                <div className="flex flex-col justify-around gap-1">
                    <span>Nome: {nome}</span>
                    <span>Email: {email}</span>
                </div>
            </div>
            <div>
                <h2 className="font-bold">Permissões:</h2>
                <div className="flex flex-col justify-around gap-1">
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
                            name={"adminStatus"+id}
                            value="cadastro"
                            onChange={handleRadioChange}
                        />
                        Cadastro
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <button className="p-2 px-5 bg-green-800 rounded-2xl font-bold text-white hover:bg-green-600">
                        Salvar
                    </button>
                </div>
                <div>
                    <button className="p-2 px-5 bg-zinc-600 rounded-2xl font-bold text-white hover:bg-zinc-400">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}