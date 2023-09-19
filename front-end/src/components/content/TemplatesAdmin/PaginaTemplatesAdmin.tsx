import SliderToggle from "@/components/util/slider/SliderToggle";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

interface ListagemProps {
  titulo: string;
  listaObj: { [key: string]: any }[];
  listaCampos: string[];
}

export default function PaginaTemplateAdmin({
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
        <div className="flex flex-col gap-4 w-full h-full p-5">
        <div className="bg-white h-full w-full rounded-3xl overflow-hidden p-5">
            <div className="flex flex-col text-zinc-800 rounded-2xl overflow-hidden">
            <div className="bg-green-800 flex justify-between items-center px-20 p-5">
                <div>
                <h1 className="font-black text-3xl text-white">{titulo}</h1>
                </div>
                <div>
                <button
                    title="Criar novo template"
                    className="flex justify-center items-center bg-green-500 text-white px-4 rounded-2xl pb-1 text-2xl font-black hover:bg-green-400 border-white border"
                >
                    +
                </button>
                </div>
            </div>
            <div className="bg-green-600 flex justify-between px-20 items-center p-5">
                <div className="flex">
                <input
                    type="text"
                    className="outline-none rounded-l-2xl p-1 px-2"
                    placeholder={"Buscar por " + selectValue}
                    value={inputValue}
                    onChange={handleInputSearchValue}
                />
                <div
                    className="w-8 bg-white rounded-r-2xl flex justify-center items-center"
                    title="Pesquisar"
                >
                    <MagnifyingGlass className="cursor-pointer" />
                </div>
                </div>
                <div>
                <ul className="flex gap-3">
                    <li>Ordenar por: </li>
                    <li>
                    <select
                        name="campos"
                        id="campos"
                        value={selectValue}
                        onChange={handleSelectValue}
                        className="outline-none border-2 rounded-2xl font-semibold bg-white overflow-hidden cursor-pointer"
                    >
                        {listaCampos.map((campo, index) => (
                        <option key={index} value={campo}>
                            {campo}
                        </option>
                        ))}
                    </select>
                    </li>
                </ul>
                </div>
            </div>
            <div className="bg-zinc-300 flex justify-around items-center p-2 rounded-b-3xl">
                <div className="flex flex-col flex-1 max-h-[100%] ">
                <table className="w-full bg-gray-300 rounded-t-2xl overflow-hidden">
                    <thead>
                    <tr className="">
                        {listaCampos.map((campo, index) => (
                        <th key={index} className=" w-1/5">
                            {campo}
                        </th>
                        ))}
                    </tr>
                    </thead>
                </table>
                </div>
            </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[72%]">
            <table className="w-full rounded-b-2xl">
                <tbody className="text-center font-semibold text-zinc-600">
                {listaObj.map((lista: any, index: any) => (
                    <tr key={index} className={`rounded-md`}>
                    {Object.keys(lista).map((lista2, innerIndex) => (
                        <td key={innerIndex} className={`w-1/5`}>
                        {lista2 === "status" ? (
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
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
}
