import Modal from "@/components/util/modal/Modal";
import Select from "@/components/util/select/Select";
import axios from "axios";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { DownloadSimple, MagnifyingGlass, Trash, X } from "phosphor-react";
import { useEffect, useState } from "react";

const objetos = ["Arquivos", "Templates"]

interface Template {
    data: string | number | Date;
    nome: string;
    formato: string;
    campos: number;
    criado_por: string;
    status: boolean;
    isNew: boolean;
    pendentes?: string;
  }

const camposArquivo = ["Nome", "Template", "Linhas", "Data", "Criado por"]
const arquivoLista = [
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", criado_por: "Matheus"},
]

const camposTemplate = ["Nome", "Formato", "Campos", "Criado por", "Data"]
const templateLista = [
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
]


export default function TabelaDashboard() {

    const [objetoSelecionado, setObjetoSelecionado] = useState("Arquivos");
    const [campoSelecionado, setCampoSelecionado] = useState(camposArquivo[0]);
    const [camposDisponiveis, setCamposDisponiveis] = useState(camposArquivo);
    const [listaAtiva, setListaAtiva]: any[]= useState(arquivoLista)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<any>()
    const [modalCamposIndex, setModalCamposIndex] = useState(0)

    const [templateReq, setTemplateReq] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true); 
    const [search, setSearch] = useState("");
    const [modalCampos, setModalCampos] = useState<any>()
  
    useEffect(() => {
        async function fetchTemplates() {
        const ip = process.env.NEXT_PUBLIC_IP || "localhost";

        try {
            const response = await axios.get(`http://${ip}:8080/api/template/getAll`);
            if (response.status === 200) {
            console.log(response.data)
            setTemplateReq(response.data.filter((template: { status: boolean; }) => template.status === true));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        }

        fetchTemplates();
    }, []);

    const fetchModalCampos= async (id: number) => {
        const ip = process.env.NEXT_PUBLIC_IP || "localhost";

        try {
            const response = await axios.get(`http://${ip}:8080/api/campos/${id}`)

            if(response.status === 200) {
                setModalCampos(response.data)
                console.log(response.data)
            }
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    const filteredTemp = search
        ? templateReq.filter((item: { [x: string]: any }) => {
            console.log(search, item)
            if (campoSelecionado.toLowerCase() === "nome") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "campos") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "criado por") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase()); 
            }     
            if (campoSelecionado.toLowerCase() === "formato") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "data") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase());      
            }
            return 0; 
        })
        : templateReq;

        const sortedTemp = filteredTemp.sort((a, b) => {
            if (campoSelecionado.toLowerCase() === "nome") {
              return String(a.nome).localeCompare(b.nome);
            }
            if (campoSelecionado.toLowerCase() === "campos") {
              return a.campos - b.campos;
            }
            if (campoSelecionado.toLowerCase() === "criado por") {
              return String(a.criado_por).localeCompare(b.criado_por);
            }
            if (campoSelecionado.toLowerCase() === "formato") {
              return String(a.formato).localeCompare(b.formato);
            }
            if (campoSelecionado.toLowerCase() === "data") {
              return new Date(b.data).getTime() - new Date(a.data).getTime();
            }
            return 0; 
          });
          


    const openModal = (value: number) => {
        setIsModalOpen(true);
        setModalContent(listaAtiva[value]);
        fetchModalCampos(listaAtiva[value].id);
    };
    
    const closeModal = () => {
        setModalCamposIndex(0)
        setIsModalOpen(false);
    };

    const handleObjetoChange = (e: any) => {
        const novoObjetoSelecionado = e.target.value;
        setObjetoSelecionado(novoObjetoSelecionado);

        if (novoObjetoSelecionado === "Arquivos") {
            setListaAtiva(arquivoLista)
            setCamposDisponiveis(camposArquivo);
            setCampoSelecionado(camposArquivo[0]);
        } else if (novoObjetoSelecionado === "Templates") {
            setListaAtiva(sortedTemp)
            setCamposDisponiveis(camposTemplate);
            setCampoSelecionado(camposTemplate[0]);
        } else {
            setCamposDisponiveis([]);
            setCampoSelecionado("");
        }
    };

    const handleCampoChange = (e: any) => {
        const novoCampoSelecionado = e.target.value;
        setCampoSelecionado(novoCampoSelecionado);
    
        const novoTotal = listaAtiva.reduce((acum: number, item: any) => {
            return acum + item[novoCampoSelecionado];
        }, 0);
        
        console.log(novoTotal);
    };
    
    return (
        <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4  ">
            <div className="flex flex-col flex-1 gap-2 p-4 max-h-[100%] ">
                <div className="flex justify-between font-bold text-zinc-700 ">
                    <div className="flex flex-1 justify-start items-center gap-2">
                        <div className="flex">
                            <span>
                                Ordenar:
                            </span>
                            <Select name="objeto" options={objetos} id="0" value={objetoSelecionado} onChange={handleObjetoChange} />
                        </div>
                        <div className="flex">
                            Por:
                            <Select name="campos" options={camposDisponiveis} id="1" value={campoSelecionado} onChange={handleCampoChange} />
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-1 justify-end lg:justify-between items-center gap-2">
                        <div className="hidden lg:block">
                            Total: {listaAtiva.length}
                        </div>
                        <div className="flex justify-stretch md:justify-end md:items-end">
                            <input 
                                className=" max-w-[100px] sm:max-w-[150px] md:max-w-[190px] lg:max-w-[200px] xl:max-w-full outline-none border-2 rounded-l-2xl h-8 bg-zinc-200 px-5"  
                                type="text" 
                                placeholder="Buscas"
                                value={search}
                                onChange={(event:any) => setSearch(event.target.value)}
                            />
                            <div
                                className="w-8 h-8 bg-zinc-200 rounded-r-2xl flex justify-center items-center"
                                title="Pesquisar"
                            >
                                <MagnifyingGlass 
                                    className="cursor-pointer" 
                                    onClick={() => filteredTemp}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 max-h-[100%] ">
                    <table className="w-full bg-gray-300 rounded-t-2xl overflow-hidden">
                        <thead className="bg-green-800 text-white">
                            <tr className="">
                                {camposDisponiveis.map((campo, index) => (
                                <th key={index} className="w-1/5">
                                    {campo}
                                </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                    <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[65%] xl:max-h-[72%] rounded-b-2xl rounded-r-3xl">
                        <table className="w-full bg-gray-300 rounded-b-2xl">
                            <tbody className="text-center font-semibold text-zinc-600">
                                {listaAtiva.map((lista: any, index: any) => (
                                    <tr
                                        onClick={() => openModal(index)}
                                        key={index}
                                        className={`${
                                        index % 2 == 0 ? "bg-gray-200" : "bg-gray300"
                                        } cursor-pointer hover:bg-green-200`}
                                    >
                                        {Object.keys(lista).map((lista2, index) => (
                                            <td key={index} className="w-1/5">{
                                                lista2 == "id" ? ""  : 
                                                lista2.toLocaleLowerCase() == "isnew" ? "" : 
                                                lista2 == "status" ? "" : 
                                                lista2 == "data" ? 
                                                <span>
                                                    {
                                                        new Date(lista[lista2]).toLocaleDateString()
                                                        // new Date(lista2).getDay().toLocaleString()+"/"+
                                                        // new Date(lista2).getMonth().toLocaleString()+"/"+
                                                        // new Date(lista2).getFullYear().toLocaleString()
                                                    }
                                                </span>
                                                : 
                                                lista[lista2]
                                            }</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {objetoSelecionado == "Templates" ?
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="p-5 select-none">
                                {objetoSelecionado == "Templates"}
                                <div className="flex justify-between">
                                    <h2 className=" font-bold text-2xl">
                                        {modalContent ? modalContent.nome : ""}
                                    </h2>
                                    <X onClick={closeModal} className="text-3xl text-red-500 cursor-pointer"/>
                                </div>
                                <div className="flex justify-around items-center gap-4 pr-0">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">Data de criação:</span><span> {modalContent ? new Date(modalContent.data).toLocaleString() : ""}</span>
                                            <span className="font-semibold">Criado por:</span><span> {modalContent ? modalContent.criado_por : ""}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col">
                                        <span className="font-semibold">Número de colunas:</span>
                                            <span> {modalContent && modalContent.campos}</span>
                                            <span className="font-semibold">Formato:</span>
                                            <span> {modalContent && modalContent.formato}</span>
                                            <span className="font-semibold">Status:</span>
                                            <span> {modalContent && modalContent.status == true ? "Ativo" : "Inativo"}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 flex-1">
                                        <div>
                                            {modalCampos && modalCampos.length > 1 ? 
                                            <div className="flex justify-between items-center gap-5">
                                                <span>
                                                    <ArrowBigLeft
                                                        className=" h-16 w-16 cursor-pointer"
                                                        onClick={() => {
                                                            modalCamposIndex > 0 ? setModalCamposIndex(modalCamposIndex - 1) :
                                                            setModalCamposIndex(modalCampos.length - 1)
                                                        }}
                                                    />
                                                </span>
                                                {modalCamposIndex + 1}/{modalCampos.length}
                                                <span>
                                                    <ArrowBigRight 
                                                        className=" h-16 w-16 cursor-pointer"
                                                        onClick={() => {
                                                            modalCamposIndex < modalCampos.length - 1 ? setModalCamposIndex(modalCamposIndex + 1) :
                                                            setModalCamposIndex(0)
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                            : ""}
                                        </div>
                                        <div className="bg-green-700 rounded-xl">
                                                <div className="flex flex-col h-full justify-center items-center w-28 p-3 gap-3">
                                                    <div className="bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                                        {modalCampos && modalCampos[modalCamposIndex].nome }
                                                    </div>
                                                    <div className="bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                                        {modalCampos && modalCampos[modalCamposIndex].tipo }
                                                    </div>
                                                    <div className="bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                                        {modalCampos && modalCampos[modalCamposIndex].nulo == true? "Nulo" : "Não nulo" }
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-center items-center w-full pt-5">
                                    <button className=" flex justify-center items-center gap-2 rounded-2xl text-white bg-green-800 hover:bg-green-600 p-2 px-4 font-semibold text-xl">
                                        Baixar <DownloadSimple className="text-white text-2xl"/>
                                    </button>
                                    <button className="flex justify-center items-center gap-2 rounded-2xl text-white bg-red-800 hover:bg-red-600 p-2 px-4 font-semibold text-xl">
                                        Excluir<Trash className="text-white text-2xl"/>
                                    </button>
                                </div>
                            </div>
                        </Modal> :
                        ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

