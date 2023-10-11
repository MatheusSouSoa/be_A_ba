import { DownloadSimple } from "phosphor-react";
import { useState } from "react";

interface ListagemProps {
    titulo: string;
    listaObj: { [key: string]: any }[];
    listaCampos: string[];
  }

export default function MeusArquivos({
    titulo,
    listaCampos,
    listaObj,
}: ListagemProps) {

    return (
        <> 
            {listaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md border-y-2 hover:bg-green-200`}>
                    {Object.keys(lista).map((lista2, innerIndex) => (
                    <td key={innerIndex} className={`w-1/5`}>
                        {lista2 === "status" ? (
                            // JSON.parse(lista[lista2]) ? 
                            //     <span className="text-green-500">ativo</span> : 
                            //     <span className="text-red-500">Inativo</span> 
                            <span title="Baixar arquivo" className="flex justify-center items-center p-1">
                                <DownloadSimple className="w-7 h-7 cursor-pointer"/>
                            </span>
                        ) : (
                        lista[lista2]
                        )}
                    </td>
                    ))}
                </tr>
            ))}

        </>
    )
}