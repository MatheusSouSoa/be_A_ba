import { FileInput } from "@/components/util/FileInput/FileInput"
import { useState } from "react"

interface CarregarArquivoProps {
    templateSelecionado: any
}

export default function CarregarArquivo({templateSelecionado} : CarregarArquivoProps) {

    const [fileName, setFileName] = useState("")
    const [selectedTemplate, setSelected] = useState<any | null>()

    return ( 
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center bg-green-800 py-3 px-10">
                <div className="flex items-center justify-center gap-5">
                    <input 
                        type="text" 
                        placeholder="Nome do arquivo" 
                        value={fileName} onChange={(event) => setFileName(event.target.value)} 
                        className="rounded-2xl px-2 outline-none h-8" 
                    />
                    {/* <div className="bg-green-500 rounded-full px-2 py-1 flex justify-center items-center border border-white text-white hover:bg-green-600 cursor-pointer">
                        Ok
                    </div> */}
                </div>
                <div>
                    <div className="flex bg-green-500 p-2 rounded-3xl gap-3 ">
                        <span className="font-bold text-white cursor-default">
                            Template
                        </span>
                        <div className="bg-white rounded-3xl w-56 overflow-y-hidden text-center px-2 font-semibold cursor-default">
                            {templateSelecionado ? 
                                templateSelecionado.nome :
                                "Não selecionado"
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className=" h-full flex flex-col justify-center items-center">
                <FileInput template={templateSelecionado}/>
            </div>
        </div>
    )
}
