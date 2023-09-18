import { useState } from "react"

export default function PaginaTemplateAdmin() {

    const [inputValue, setInputValue] = useState("")

    function handleInputSearchValue (event: any) {
        setInputValue(event.target.value)
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full p-5">
            <div className="bg-white h-full w-full rounded-3xl overflow-hidden p-5">
                <div className="flex flex-col text-zinc-800 rounded-2xl overflow-hidden">
                    <div className="bg-green-800 flex justify-between items-center px-20 p-5">
                        <div>
                            <h1 className="font-black text-3xl text-white">Templates disponível:</h1>
                        </div>
                        <div>
                            <button className="flex justify-center items-center bg-green-500 text-white px-4 rounded-2xl pb-1 text-2xl font-black hover:bg-green-400 border-white border">
                                +
                            </button>
                        </div>
                    </div>
                    <div className="bg-green-600 flex justify-between px-20 items-center p-5">
                        <div>
                            <input type="text" className="outline-none rounded-2xl w-80 p-1 px-2"
                                placeholder={"buscar por nome"}  
                                value={inputValue}
                                onChange={handleInputSearchValue}  
                            />
                        </div>
                        <div>
                            <ul className="flex gap-3">
                                <li>Ordenar por: </li>
                                <li>
                                    <select name="campos" id="campos">
                                        <option value="nome">Nome</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-zinc-300 flex justify-around items-center p-2 rounded-b-3xl">
                        <div>
                            a
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}