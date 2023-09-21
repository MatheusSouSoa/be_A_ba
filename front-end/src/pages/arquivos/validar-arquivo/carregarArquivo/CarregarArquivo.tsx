import { useState } from "react"

export default function CarregarArquivo() {

    const [fileName, setFileName] = useState("")
    const [templateSelection, setTemplate] = useState("")


    return ( 
        <div className="flex flex-col">
            <div className="flex justify-between items-center bg-green-800 py-3 px-10">
                <div className="flex gap-5">
                    <input 
                        type="text" 
                        placeholder="Nome do arquivo" 
                        value={fileName} onChange={(event) => setFileName(event.target.value)} 
                        className="rounded-2xl px-2 outline-none" 
                    />
                    <div className="bg-green-500 rounded-full h-10 w-10 flex justify-center items-center border border-white text-white hover:bg-green-600 cursor-pointer">
                        Ok
                    </div>
                </div>
                <div>
                    <div className="flex bg-green-500 p-2 rounded-3xl gap-3 ">
                        <span className="font-bold text-white cursor-default">
                            Template
                        </span>
                        <div className="bg-white rounded-3xl px-2 font-semibold cursor-default">
                            Não selecionado
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <input type="file" name="" placeholder="" id="" />
            </div>
        </div>
    )
}