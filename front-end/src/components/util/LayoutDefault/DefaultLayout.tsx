import AdminTemplate from "@/components/content/AdminTemplate/AdminTemplate";
import TemplatesComponent from "@/components/content/Templates/TemplatesComponent";
import SliderToggle from "@/components/util/slider/SliderToggle";
import { useRouter } from "next/router";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

interface ListagemProps {
  titulo: string;
  listaObj: { [key: string]: any }[];
  listaCampos: string[];
}

export default function DefaultLayout({
    titulo,
    listaCampos,
    listaObj,
}: ListagemProps) {

    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState(listaCampos[0]);
    const [statuses, setStatuses] = useState(
        listaObj.map((item) => item.status)
    );

    const router = useRouter()

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
            <div className="bg-white h-full w-full rounded-3xl overflow-hidden">
                <div className="flex flex-col text-zinc-800 rounded-2xl overflow-hidden">
                    <div className="bg-green-800 flex justify-between items-center px-20 p-5">
                        <div>
                            <h1 className="font-black text-3xl text-white">{titulo}</h1>
                        </div>
                        <div>
                            {router.pathname !== "/arquivos/meus-arquivos" ? (
                                <button
                                    title="Criar novo template"
                                    className="flex justify-center items-center bg-green-500 text-white px-4 rounded-2xl pb-1 text-2xl font-black hover:bg-green-400 border-white border"
                                >
                                    +
                                </button> 
                                ) : ""
                            
                            }
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
                    <div className="bg-zinc-400 flex justify-around items-center p-2 rounded-b-3xl">
                        <div className="flex flex-col flex-1 max-h-[100%] ">
                            <table className="w-full bg-gray-400 rounded-t-2xl overflow-hidden">
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
                        {router.pathname === "/admin/templates" ? (
                            <AdminTemplate listaCampos={listaCampos} listaObj={listaObj} titulo={titulo} />
                            ) : router.pathname === "/templates" ? (
                                <TemplatesComponent listaCampos={listaCampos} listaObj={listaObj} titulo={titulo}/>
                            ) : router.pathname === "/arquivos/meus-arquivos" ? (
                                "<ArquivosComponent listaCampos={listaCampos} listaObj={listaObj} titulo={titulo} />"
                            ) : 
                                router.pathname === "/arquivos" ?
                            (
                                "<DefaultComponent listaCampos={listaCampos} listaObj={listaObj} titulo={titulo} />"
                            ): ""
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
