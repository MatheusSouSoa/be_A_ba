import { useEffect, useState } from "react";
import CardUsuario from "../card-usuario/CardUsuario";
import { MagnifyingGlass } from "phosphor-react";
import axios from "axios";

export default function PaginaEditarUsuarios() {

    const [users, setUsers] = useState<any[]>([]);

    async function fetchUsers() {
        try {
            const ip = process.env.NEXT_PUBLIC_IP || "localhost";
            const response = await axios.get(`http://${ip}:8080/api/usuario/velhos`);
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            console.log(err);
        }
    }

    function onDelete(id: number){
        const updateUsers = users.filter((item) => item.id !== id)
        setUsers(updateUsers)
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const buttons = ["Salvar", "Excluir"]
    const [selectValue, setSelectValue] = useState("nome");
    const [inputValue, setInputValue] = useState("")

    function handleCampoChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const novoValor = event.target.value;
        setSelectValue(novoValor);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto scrollbar-custom px-5 pt-5">
            <div className="flex flex-col justify-center items-center  w-full">
                <header className="bg-green-700 p-4 text-4xl font-black w-full flex justify-center items-center rounded-t-3xl">
                    <h1>Usuários cadastrados</h1>
                </header>
                <div className="w-full bg-white rounded-b-full p-3">
                    <ul className="flex text-zinc-700 font-bold justify-around">
                        <li>
                            Ordenar por: 
                            <select
                                value={selectValue}
                                onChange={handleCampoChange}
                                className="outline-none border-2 rounded-2xl font-semibold bg-zinc-200 overflow-hidden cursor-pointer"
                            >
                                <option className="font-semibold" value="nome">
                                    Nome
                                </option>
                                <option className="font-semibold" value="email">
                                    Email
                                </option>
                            </select>
                        </li>
                        <li className="flex border-zinc-500">
                            <input 
                                type="text" 
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder={"pesuisar por " + selectValue} 
                                className="outline-none border text-zinc-500 border-zinc-500 px-2 rounded-l-full  bg-gray-200"
                            />
                           <div className="border-zinc-500 px-2 bg-gray-500 rounded-r-full border hover:bg-zinc-400 cursor-pointer flex justify-center items-center">
                                <MagnifyingGlass/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="h-full w-full flex flex-col overflow-y-auto scrollbar-custom px-10 p-5 gap-5">
                {users.map((user:any, index:number) => (
                    <CardUsuario 
                        onDelete={()=>onDelete(index)}
                        email={user.email} 
                        id={user.id} 
                        nome={user.nome} 
                        isadmin={user.isAdmin} 
                        matricula={user.matricula}
                        key={index} 
                        isNew={user.isNew} 
                        pagina="edit" 
                        buttons={buttons}
                    />
                ))}
            </div>
        </div>
    );
}
