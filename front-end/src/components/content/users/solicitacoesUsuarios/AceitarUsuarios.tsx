import { useEffect, useState } from "react";
import CardUsuario from "../card-usuario/CardUsuario";
import { MagnifyingGlass } from "phosphor-react";
import axios from "axios";
import { UseAuth } from "@/hooks/useAuth";


export default function PaginaSolicitacoesUsuarios() {

    const [users, setUsers] = useState<any[]>([]);
    const [campoSelecionado, setCampoSelecionado] = useState<any>("nome");
    const [search, setSearch] = useState("");
    const {config} = UseAuth()
    
    function handleSearch(value: string) {
        setSearch(value);
    }

    async function fetchUsers() {
        try {
            const ip = process.env.NEXT_PUBLIC_IP || "localhost";
            const response = await axios.get(`http://${ip}:8080/api/admin/usuario/novos`, config);
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            console.log(err);
        }
    }

    function onDelete(id: number){
        const updateUsers = [...users]
        updateUsers.splice(id, 1)
        setUsers(updateUsers)
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCampos = (value: string) => {
        if(value == "nome"){
          setCampoSelecionado("nome")
        }
        if(value == "email"){
          setCampoSelecionado("email")
        }
        if(value == "matricula"){
          setCampoSelecionado("matricula")
        }
    };

    const buttons = ["Aprovar", "Recusar"]

    const [selectValue, setSelectValue] = useState("nome");
    const [inputValue, setInputValue] = useState("")

    function handleCampoChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const novoValor = event.target.value;
        setSelectValue(novoValor);
    }

    const filtered = search
        ? users.filter((item: { [x: string]: any }) => {
            console.log(item, campoSelecionado)
            return String(item[campoSelecionado]).toLowerCase().includes(search.toLowerCase());
            })
        : users;

    const sorted = filtered.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const fieldA = String(a[campoSelecionado]).toLowerCase();
        const fieldB = String(b[campoSelecionado]).toLowerCase();

        return fieldA.localeCompare(fieldB);
    });

    return (
        <div className="h-full w-full flex flex-col overflow-y-auto scrollbar-custom px-5 pt-5">
            <div className="flex flex-col justify-center items-center  w-full">
                <header className="bg-green-700 p-4 text-4xl font-black w-full flex justify-center items-center rounded-t-3xl">
                    <h1>Usuários bloqueados</h1>
                </header>
                <div className="w-full bg-white rounded-b-full p-3">
                    <ul className="flex text-zinc-700 font-bold justify-around">
                        <li>
                            Ordenar por: 
                            <select
                                value={campoSelecionado}
                                onChange={(e:any) => handleCampos(e.target.value)}
                                className="outline-none border-2 rounded-2xl font-semibold bg-zinc-200 overflow-hidden cursor-pointer"
                            >
                                <option className="font-semibold" value="nome">
                                    Nome
                                </option>
                                <option className="font-semibold" value="email">
                                    Email
                                </option>
                                <option className="font-semibold" value="matricula">
                                    Matrícula
                                </option>
                            </select>
                        </li>
                        <li className="flex border-zinc-500">
                            <input 
                                type="text" 
                                value={search}
                                onChange={(e: any) => handleSearch(e.target.value)}
                                placeholder={"pesuisar por " + campoSelecionado} 
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
                {sorted.map((user:any , index:number) => (
                    <CardUsuario
                        email={user.email}
                        id={user.id}
                        nome={user.nome}
                        matricula={user.matricula}
                        isadmin={user.isAdmin}
                        key={index}
                        pagina="cad"
                        buttons={buttons}
                        isNew={user.isNew !== undefined ? user.isNew : false}
                        onDelete={() => onDelete(index)}
                    />
                ))}
            </div>
        </div>
    );
}
