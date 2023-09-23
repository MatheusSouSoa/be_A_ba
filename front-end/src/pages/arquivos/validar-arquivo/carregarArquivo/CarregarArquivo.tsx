import { useState } from "react"

export default function CarregarArquivo() {

    const [fileName, setFileName] = useState("")
    const [templateSelection, setTemplate] = useState("")


    return ( 
        <div className="flex flex-col h-full">
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
            <div className=" h-full flex flex-col justify-center items-center">
              <div className="w-full h-full p-2">
                  {/* se n tiver arquivo, mostrar opção de selecionar do pc ou arrastar, se tiver, mostrar o nome do arquivo no lugar */}
                  <label
                      className="flex justify-center w-full h-full px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="font-medium text-gray-600">
                              Solte arquivos aqui, ou
                              <span className="text-blue-600 underline pl-2">clique aqui procure</span>
                          </span>
                      </span>
                      <input type="file" name="file_upload" className="hidden"/>
                  </label>
              </div>
            </div>
        </div>
    )
}
