import SliderToggle from "@/components/util/slider/SliderToggle";
import { Check, X } from "phosphor-react";
import { useState } from "react";

interface ListagemProps {
    titulo: string;
    listaObj: { [key: string]: any }[];
    listaCampos: string[];
    pendente: boolean
    handleListaObj?: () => void;
  }

export default function AdminTemplate({
    titulo,
    listaCampos,
    listaObj,
    pendente
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

    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState(listaCampos[0]);
    const [statuses, setStatuses] = useState(
        listaObj.map((item) => item.status)
    );

    function aprovar(index: number) {
        filteredListaObj[index].isNew = false;
        filteredListaObj[index].status = true;
        filteredListaObj = filter()
        console.log(filteredListaObj[index])
    }

    const handleStatusChange = (index: number, newStatus: boolean) => {
        const updatedStatuses = [...statuses];
        updatedStatuses[index] = newStatus;
        setStatuses(updatedStatuses);

        const updatedListaObj = [...listaObj];
        updatedListaObj[index].status = newStatus;

        // realizar alguma ação com a lista de objetos atualizada,
        // como enviar os dados atualizados para o servidor.

        console.log("status", index, " : ", newStatus);
    };
    return (
        <> 
            {filteredListaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md`}>
                {Object.keys(lista).map((lista2, innerIndex) => (
                    <td key={innerIndex} className={`w-1/5 p-1`}>
                    {lista2 === "status" ? (
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
                                handleStatusChange(index, newStatus)
                            }
                            />
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