import AdminTemplate from "@/components/content/AdminTemplate/AdminTemplate";
import MeusArquivos from "@/components/content/Files/MyFiles/MeusArquivos";
import TemplatesComponent from "@/components/content/Templates/TemplatesComponent";
import { useRouter } from "next/router";
import { DownloadSimple, MagnifyingGlass, X } from "phosphor-react";
import { useState } from "react";
import Modal from "../modal/Modal";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import axios from "axios";
import { UseAuth } from "@/hooks/useAuth";

interface ListagemProps {
  titulo: string;
  listaObj: { [key: string]: any }[];
  listaCampos: string[];
  handleSearch: (value: string) => void
  handleCampo: (value: string) => void
  handleForceUpdate?: () => void
}

export default function DefaultLayout({
    titulo,
    listaCampos,
    listaObj,
    handleSearch,
    handleCampo,
    handleForceUpdate
}: ListagemProps) {
    
    const router = useRouter()
    const {user} = UseAuth()

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
          sendToCreateTemplate(templateModalInput)
        }
        if(event.key === "Escape") {
            closeModal()
        }
      };

    function sendToCreateTemplate(templateName: string ) {
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

    const [modalCampos, setModalCampos] = useState<any>()
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [modalContent, setModalContent] = useState<any>()
    const [modalCamposIndex, setModalCamposIndex] = useState(0)
    const {config} = UseAuth()

    const closeModal2 = () => {
        setModalCamposIndex(0)
        setIsModalOpen2(false);
    };

    const openModal2 = (value: number, obj: any) => {
        setModalContent(obj)
        setIsModalOpen2(true);
        setModalContent(listaObj[value]);
        fetchModalCampos(listaObj[value].id);
    };

    const fetchModalCampos= async (id: number) => {
        const ip = process.env.NEXT_PUBLIC_IP || "localhost";

        try {
            const response = await axios.get(`http://${ip}:8080/api/campos/${id}`, config)

            if(response.status === 200) {
                setModalCampos(response.data)
            }
        } catch (error) {
          console.error(error);
        }
    }


    return (
        <div className="flex flex-col gap-4 w-full h-full p-2 sm:p-5">
            <div className="bg-white h-full w-full rounded-3xl overflow-hidden">
                <div className="flex flex-col text-zinc-800 rounded-2xl overflow-hidden">
                    <div className="bg-green-800 flex justify-between items-center px-10 p-5">
                        <div>
                            <h1 className="font-black text-xl md:text-2xl lg:text-3xl text-white">{titulo}</h1>
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
                    <div className="bg-green-600 flex justify-between lg:px-10 items-center px-3 py-5 md:p-5">
                        <div className="flex text-xs sm:text-md md:text-lg lg:text-xl">
                            <input
                                type="text"
                                className="outline-none w-20 sm:w-44 md:w-56 lg:w-auto rounded-l-2xl p-1 px-2"
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
                            <ul className="flex gap-1 lg:gap-3 text-xs sm:text-md md:text-lg lg:text-xl">
                                <li className="font-bold  text-white">Ordenar por: </li>
                                <li>
                                <select
                                    name="campos"
                                    id="campos"
                                    value={selectValue}
                                    onChange={handleSelectValue}
                                    className="outline-none border-2 rounded-2xl font-semibold bg-white overflow-hidden cursor-pointer"
                                >
                                    {listaCampos.map((campo, index) => {
                                        if(campo == "download"){
                                            return null
                                        }
                                        return (
                                        <option key={index} value={campo == "Ativo" ? "Pendentes" : campo}>
                                            {campo == "Ativo" ? "Pendentes" : campo.toLowerCase() === "download" ? "" :
                                            campo}
                                        </option>
                                        )
                                        })}
                                </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-zinc-400 flex justify-around items-center p-2 rounded-b-3xl">
                        <div className="flex flex-col flex-1 max-h-[100%] ">
                            <table className="w-full bg-gray-400 rounded-t-2xl overflow-hidden text-xs md:text-sm lg:text-md">
                                <thead>
                                <tr className="">
                                    {listaCampos.map((campo, index) => (
                                    <th key={index} className=" w-1/5">
                                        {campo == "Ativo" ? 
                                            selectValue == "Pendentes" ? "Solicitações" : campo
                                            :
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
                                    handleForceUpdate={handleForceUpdate}
                                />
                            ) : router.pathname === "/templates" ? (
                                <TemplatesComponent  
                                    listaCampos={listaCampos} 
                                    listaObj={listaObj} 
                                    titulo={titulo}
                                    handleModal={openModal2}
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
            <Modal isOpen={isModalOpen2} onClose={closeModal2}>
                <div className="py-5 text-black select-none ">
                    <div className="flex justify-between">
                        <h2 className=" font-bold pb-2 text-2xl">
                            {modalContent ? modalContent.nome : ""}
                        </h2>
                        <X onClick={closeModal2} className="text-3xl text-red-500 cursor-pointer" />
                    </div>
                    <div className="flex justify-around items-center gap-4 pr-0">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col">
                                <span className="font-bold">Data de criação:</span><span> {modalContent ? new Date(modalContent.data).toLocaleString() : ""}</span>
                                <span className="font-bold">Criado por:</span><span> {modalContent ? modalContent.criado_por : ""}</span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col">
                                <span className="font-bold">Número de colunas:</span>
                                <span> {modalContent && modalContent.campos}</span>
                                <span className="font-bold">Formato:</span>
                                <span> {modalContent && modalContent.formato}</span>
                                <span className="font-bold">Status:</span>
                                <span> {modalContent && modalContent.status == true ? "Ativo" : "Inativo"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 flex-1">
                            <div>
                                {modalCampos && modalCampos.length > 1 ?
                                    <div className="flex justify-between items-center gap-5">
                                        <span>
                                            <ArrowBigLeft
                                                className=" h-16 w-16 cursor-pointer text-green-700 fill-green-700 hover:text-green-500 hover:fill-green-500"
                                                onClick={() => {
                                                    modalCamposIndex > 0 ? setModalCamposIndex(modalCamposIndex - 1) :
                                                        setModalCamposIndex(modalCampos.length - 1);
                                                } } />
                                        </span>
                                        {modalCamposIndex + 1}/{modalCampos.length}
                                        <span>
                                            <ArrowBigRight
                                                className=" h-16 w-16 cursor-pointer text-green-700 fill-green-700 hover:text-green-500 hover:fill-green-500"
                                                onClick={() => {
                                                    modalCamposIndex < modalCampos.length - 1 ? setModalCamposIndex(modalCamposIndex + 1) :
                                                        setModalCamposIndex(0);
                                                } } />
                                        </span>
                                    </div>
                                    : ""}
                            </div>
                            <div className="bg-green-700 rounded-xl">
                                <div className="flex flex-col h-full justify-center items-center w-44 p-3 gap-3">
                                    <div className="bg-white font-semibold w-full text-center rounded-xl px-2 overflow-hidden">
                                        {modalCampos && modalCampos[modalCamposIndex].nome}
                                    </div>
                                    <div className=" font-semibold bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                        {modalCampos && modalCampos[modalCamposIndex].tipo}
                                    </div>
                                    <div className=" font-semibold bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                        {modalCampos && modalCampos[modalCamposIndex].nulo == true ? "Nulo" : "Não nulo"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-center items-center w-full pt-5">
                        <a href={`http://127.0.0.1:5000/api/templates/download/${modalContent && modalContent.id_criador}/${modalContent && modalContent.id}`} className=" flex justify-center items-center gap-2 rounded-2xl text-white bg-green-800 hover:bg-green-600 p-2 px-4 font-semibold text-xl">
                            Baixar <DownloadSimple className="text-white text-2xl" />
                        </a>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
