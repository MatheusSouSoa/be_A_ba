import { useState } from "react";
import { format } from "date-fns";
import Modal from "@/components/util/modal/Modal";
import { DownloadSimple, Trash, X } from "phosphor-react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import axios from "axios";

interface ListagemProps {
    titulo: string;
    listaObj: { [key: string]: any }[];
    listaCampos: string[];
    handleModal: (index:number, Obj: any) => void;
}

export default function TemplatesComponent({
    titulo,
    listaCampos,
    listaObj,
    handleModal
}: ListagemProps) {


    return (
            <>
            {listaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md border-y-2 hover:bg-green-100 cursor-pointer`}
                    onClick={() => handleModal(index, lista)}
                >
                    {Object.keys(lista).map((lista2, innerIndex) => (
                        <td key={innerIndex} className={`w-1/5`}>
                            {lista2 === "id" ? "" : lista2 === "id_criador" ? "" : lista2 === "status" ? (
                                ""
                                // JSON.parse(lista[lista2]) ? 
                                //     <span className="text-green-500">ativo</span> : 
                                //     <span className="text-red-500">Inativo</span> 
                            ) : lista2 === "data" ? (
                                <span>
                                    {`${new Date(lista[lista2]).toLocaleDateString()}`}
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
