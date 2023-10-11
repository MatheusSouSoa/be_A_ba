import { useState } from "react";
import { format } from "date-fns"; // Importe a função de formatação de data do date-fns

interface ListagemProps {
    titulo: string;
    listaObj: { [key: string]: any }[];
    listaCampos: string[];
}

export default function TemplatesComponent({
    titulo,
    listaCampos,
    listaObj,
}: ListagemProps) {

    return (
        <> 
            {listaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md border-y-2 hover:bg-green-100 cursor-pointer`}>
                    {Object.keys(lista).map((lista2, innerIndex) => (
                    <td key={innerIndex} className={`w-1/5`}>
                        {lista2 === "id" ? "" : lista2 === "status" ? (
                            ""
                            // JSON.parse(lista[lista2]) ? 
                            //     <span className="text-green-500">ativo</span> : 
                            //     <span className="text-red-500">Inativo</span> 
                        ) : lista2 === "data" ? (
                            <span>
                                {`${new Date (lista[lista2]).toLocaleDateString()}`}
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
