import { useState } from "react";

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

    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState(listaCampos[0]);
    const [statuses, setStatuses] = useState(
        listaObj.map((item) => item.status)
    );

    function handleInputSearchValue(event: any) {
        setInputValue(event.target.value);
    }

    function handleSelectValue(event: any) {
        setSelectValue(event.target.value);
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
            {listaObj.map((lista: any, index: any) => (
                <tr key={index} className={`rounded-md`}>
                    {Object.keys(lista).map((lista2, innerIndex) => (
                    <td key={innerIndex} className={`w-1/5`}>
                        {lista2 === "status" ? (
                            JSON.parse(lista[lista2]) ? 
                                <span className="text-green-500">ativo</span> : 
                                <span className="text-red-500">Inativo</span> 
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