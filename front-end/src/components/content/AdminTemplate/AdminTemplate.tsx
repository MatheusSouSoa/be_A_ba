import SliderToggle from "@/components/util/slider/SliderToggle";
import axios from "axios";
import { Check, X } from "phosphor-react";
import { useState } from "react";

interface ListagemProps {
    titulo: string;
    listaObj: { [key: string]: any }[];
    listaCampos: string[];
    pendente: boolean
    handleListaObj?: (value: any) => void;
  }

export default function AdminTemplate({
    titulo,
    listaCampos,
    listaObj,
    pendente,
    handleListaObj
}: ListagemProps) {

    let filteredListaObj = filter()

    function filter() {
        return listaObj.filter((item) => {
            if (!pendente) {
                return item.isNew === true;
            } else {
                return item.isNew === false;
            }
        });
    }

    const [currentId, setCurrentId] = useState<any>(-1)
    const [statuses, setStatuses] = useState(
        filteredListaObj.map((item) => item.status)
    );

    function aprovar(index: number) {
        const updatedFilteredListaObj = [...filteredListaObj]; // Criar uma cópia
        updatedFilteredListaObj[index].isNew = false;
        updatedFilteredListaObj[index].status = true;
        updatedFilteredListaObj.splice(index, 1); // Remover o objeto da lista
        console.log(updatedFilteredListaObj)
        if(handleListaObj)
            handleListaObj(updatedFilteredListaObj)
    }

    async function handleStatusChange  (index: number, newStatus: boolean, template: any) {
        
        // realizar alguma ação com a lista de objetos atualizada,
        // como enviar os dados atualizados para o servidor.
        const ip = process.env.NEXT_PUBLIC_IP || "localhost"
        
        const updatedStatuses = [...statuses];
        updatedStatuses[index] = newStatus;
        setStatuses(updatedStatuses);

        const updatedListaObj = [...listaObj];
        updatedListaObj[index].status = newStatus;
        
        console.log(template.id)
        try {
            const response = await axios.put(`http://${ip}:8080/api/template/changeStatus/${template.id}`)
            if(response.status === 200) {
                return console.log(response.data)
            }
            else{
                return console.log(response.data)
            }
            
        } catch (error) {
            console.error(error)
        }
        
        console.log("status", template.id, " : ", newStatus);
    };

    console.log("admiTemplate: ",filteredListaObj)
    return (
        <> 
            {filteredListaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md border-y text-xs md:text-md lg:text-lg`}>
                {Object.keys(lista).map((lista2, innerIndex) => (
                    <td key={innerIndex} className={`w-1/5 p-1`}>
                    {lista2 === "id" ? "" &&  setCurrentId(lista2) : lista2 === "status" ? (
                        pendente != true ? (
                            <div className="flex gap-5 items-center justify-center">
                                <span title="Aceitar solicitação">
                                    <Check onClick={() => aprovar(index)} className="w-7 h-7 text-green-500 cursor-pointer"/>
                                </span>
                                <span title="Recusar solicitação">
                                    <X className="w-7 h-7 text-red-500 cursor-pointer"/>
                                </span>
                            </div>
                        ) :
                        <SliderToggle
                            isChecked={statuses[index]}
                            onChange={(newStatus) =>
                                handleStatusChange(index, newStatus, lista)
                            }
                            />
                    ) : (
                        <span className="cursor-pointer">{lista[lista2]}</span>
                    )}
                    </td>
                ))}
                </tr>
            ))}
        </>
    )
}