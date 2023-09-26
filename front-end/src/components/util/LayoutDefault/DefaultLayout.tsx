import AdminTemplate from "@/components/content/AdminTemplate/AdminTemplate";
import MeusArquivos from "@/components/content/Files/MyFiles/MeusArquivos";
import TemplatesComponent from "@/components/content/Templates/TemplatesComponent";
import { useRouter } from "next/router";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import Modal from "../modal/Modal";

interface ListagemProps {
  titulo: string;
  listaObj: { [key: string]: any }[];
  listaCampos: string[];
  handleSearch: (value: string) => void
  handleCampo: (value: string) => void
}

export default function DefaultLayout({
    titulo,
    listaCampos,
    listaObj,
    handleSearch,
    handleCampo
}: ListagemProps) {
    
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [inputModalErr, setInputModalErr] = useState("");
    const [inputModalPlaceHolder, setInputModalPlaceHolder] = useState("Informe o nome do template aqui");

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
        setInputModalPlaceHolder("Informe o nome do template aqui")
        setInputModalErr("")
        setTemplateModalInput("")
        setIsModalOpen(false);
    };

    function handleKeyUp  (event: React.KeyboardEvent<HTMLInputElement>)  {
        if (event.key === "Enter") {
          // Lógica a ser executada quando a tecla Enter for pressionada
          sendToCreateTemplate(templateModalInput)
        }
        if(event.key === "Escape") {
            closeModal()
        }
      };

    function sendToCreateTemplate(templateName: string ) {
        console.log("clicou")
        if (templateName == "") {
            setInputModalPlaceHolder("Não pode estar vazio.");
            setInputModalErr("border border-red-500");
            return
        }
        localStorage.setItem("NomeTemplate", templateName)
        router.push(`/templates/cadastrar-template`);
        
    }

    const [templateModalInput, setTemplateModalInput] = useState("");

    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState(listaCampos[0]);
    const [statuses, setStatuses] = useState(
        listaObj.map((item) => item.status)
    );

    function handleModalTemplateInput(event: any) {
        setInputModalPlaceHolder("")
        setInputModalErr("")
        setTemplateModalInput(event.target.value)
    }

    function handleInputSearchValue(event: any) {
        handleSearch(event.target.value)
        setInputValue(event.target.value);
    }

    function handleSelectValue(event: any) {
        handleCampo(event.target.value)
        setSelectValue(event.target.value);
    }


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
                                <>
                                    <button
                                        onClick={openModal}
                                        title="Criar novo template"
                                        className="flex justify-center items-center bg-green-500 text-white px-4 rounded-2xl pb-1 text-2xl font-black hover:bg-green-400 border-white border"
                                    >
                                        +
                                    </button> 
                                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                                        {/* Conteúdo do seu modal aqui */}
                                        <h2 className="text-2xl mb-4">Nome do template:</h2>
                                        <div className="flex flex-col gap-5">
                                            <input
                                                onChange={handleModalTemplateInput}
                                                className={`
                                                outline-none border border-gray-200 w-full rounded-3xl p-2
                                                ${inputModalErr}
                                                `} 
                                                type="text" 
                                                placeholder={inputModalPlaceHolder}
                                                value={templateModalInput}
                                                onKeyUp={handleKeyUp}
                                            />
                                            <div className="flex gap-4 justify-center items-center ">
                                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                                    onClick={() => sendToCreateTemplate(templateModalInput)}
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={closeModal}
                                                    className="modal-close bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                </>
                                ) : ""
                            }
                        </div>
                    </div>
                    <div className="bg-green-600 flex justify-between px-20 items-center p-5">
                        <div className="flex">
                            <input
                                type="text"
                                className="outline-none rounded-l-2xl p-1 px-2"
                                placeholder={selectValue === "Ativo" || selectValue == "Pendentes" ? "Campo de buscas" : "Buscar por "+selectValue}
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
                                <li className="font-bold text-white">Ordenar por: </li>
                                <li>
                                <select
                                    name="campos"
                                    id="campos"
                                    value={selectValue}
                                    onChange={handleSelectValue}
                                    className="outline-none border-2 rounded-2xl font-semibold bg-white overflow-hidden cursor-pointer"
                                >
                                    {listaCampos.map((campo, index) => (
                                    <option key={index} value={campo == "Ativo" ? "Pendentes" : campo}>
                                        {campo == "Ativo" ? "Pendentes" : 
                                        campo}
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
                                        {campo == "Ativo" ? 
                                            selectValue == "Pendentes" ? "Solicitações" : campo
                                        : campo == "Download" ? "" :
                                            campo}
                                    </th>
                                    ))}
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[72%] pb-16">
                    <table className="w-full rounded-b-2xl">
                        <tbody className="text-center font-semibold text-zinc-600">
                        {router.pathname === "/admin/templates" ? (
                                <AdminTemplate 
                                    pendente={selectValue == "Pendentes" ? false : true} 
                                    listaCampos={listaCampos} 
                                    listaObj={listaObj} 
                                    titulo={titulo} 
                                />
                            ) : router.pathname === "/templates" ? (
                                <TemplatesComponent  
                                    listaCampos={listaCampos} 
                                    listaObj={listaObj} 
                                    titulo={titulo}
                                />
                            ) : router.pathname === "/arquivos/meus-arquivos" ? (
                                <MeusArquivos 
                                    listaCampos={listaCampos} 
                                    listaObj={listaObj} 
                                    titulo={titulo} 
                                />
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
