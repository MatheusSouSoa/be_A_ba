import Modal from "@/components/util/modal/Modal";
import Select from "@/components/util/select/Select";
import { UseAuth } from "@/hooks/useAuth";
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

const camposArquivo = ["Nome", "Template", "Criado por", "Data"]
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

const camposTemplate = ["Nome", "Formato",  "Criado por", "Data"]
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
    const [campoSelecionado, setCampoSelecionado] = useState(camposArquivo[3]);
    const [camposDisponiveis, setCamposDisponiveis] = useState(camposArquivo);
    const [listaAtiva, setListaAtiva] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<any>()
    const [modalCamposIndex, setModalCamposIndex] = useState(0)

    const [filesReq, setFilesReq] = useState<any[]>([]);
    const [templateReq, setTemplateReq] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true); 
    const [search, setSearch] = useState("");
    const [modalCampos, setModalCampos] = useState<any>()
    const [reload, setReload] = useState<boolean>(false)

    const {config, user} = UseAuth()
  
    useEffect(() => {
        async function fetchTemplates() {
        const ip = process.env.NEXT_PUBLIC_IP || "localhost";
        
        try {
            // const responseFiles = await axios.get(`http://${ip}:8080/api/arquivo`, config);
            const responseFiles = await axios.get(`http://127.0.0.1:5000/api/arquivos`, config);
            const response = await axios.get(`http://${ip}:8080/api/admin/template/getAllAdminDashboard`, config);
            if (response.status === 200) {
                setTemplateReq(response.data);
            }
            else{
                console.log("Erro ao buscar templates")
            }
            if(responseFiles.status === 200){
                setFilesReq(responseFiles.data)
                setListaAtiva(responseFiles.data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        }
        fetchTemplates();
        setReload(false)
    }, [reload]);

    const fetchModalCampos= async (id: number) => {
        const ip = process.env.NEXT_PUBLIC_IP || "localhost";

        try {
            const response = await axios.get(`http://${ip}:8080/api/campos/${id}`, config)

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
    
    const deleteFile = async(id: number, caminho: string) => {
        setLoading(true)
        
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/files/delete/${id}?file_path=${caminho}`)
            
            if(response.status === 200) {
                setReload(true)
                closeModal()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const filteredTemp = search
        ? templateReq.filter((item: { [x: string]: any }) => {
            if (campoSelecionado.toLowerCase() === "nome") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "campos") {
                return String(item["campos"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "criado por") {
                return String(item["criado_por"]).toLowerCase().includes(search.toLowerCase()); 
            }     
            if (campoSelecionado.toLowerCase() === "formato") {
                return String(item["formato"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "data") {
                return String(item["data"]).toLowerCase().includes(search.toLowerCase());      
            }
            return 0; 
        })
        : templateReq;

    const filteredFiles = search
        ? filesReq.filter((item: { [x: string]: any }) => {
            if (campoSelecionado.toLowerCase() === "nome") {
                return String(item["nome"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "template") {
                return String(item["template"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "criado por") {
                return String(item["criado_por"]).toLowerCase().includes(search.toLowerCase()); 
            }     
            if (campoSelecionado.toLowerCase() === "formato") {
                return String(item["formato"]).toLowerCase().includes(search.toLowerCase());      
            }
            if (campoSelecionado.toLowerCase() === "data") {
                return String(item["data"]).toLowerCase().includes(search.toLowerCase());      
            }
            return 0; 
        })
        : filesReq;

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

        const sortedFiles = filteredFiles.sort((a, b) => {
            if (campoSelecionado.toLowerCase() === "nome") {
              return String(a.nome).localeCompare(b.nome);
            }
            if (campoSelecionado.toLowerCase() === "template") {
              return String(a.template).localeCompare(b.template);
            }
            if (campoSelecionado.toLowerCase() === "criado por") {
              return String(a.enviado_por).localeCompare(b.enviado_por);
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
        if(objetoSelecionado.toLowerCase() == "templates")  
            fetchModalCampos(listaAtiva[value].id);
    };
    
    const closeModal = () => {
        setModalCamposIndex(0)
        setIsModalOpen(false);
    };

    const handleObjetoChange = (e: any) => {
        const novoObjetoSelecionado = e;
        setObjetoSelecionado(novoObjetoSelecionado);

        if (novoObjetoSelecionado === "Arquivos") {
            setListaAtiva(sortedFiles)
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
                            <Select name="objeto" options={objetos} id="0" value={objetoSelecionado} onChange={(event) => handleObjetoChange(event.target.value)} />
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
                                className="hidden sm:block max-w-[100px] sm:max-w-[150px] md:max-w-[190px] lg:max-w-[200px] xl:max-w-full outline-none border-2 rounded-l-2xl h-8 bg-zinc-200 px-5"  
                                type="text" 
                                placeholder="Buscas"
                                value={search}
                                onChange={(event:any) => setSearch(event.target.value)}
                            />
                            <div
                                className="w-8 h-8 bg-zinc-200 rounded-2xl sm:rounded-none sm:rounded-r-2xl flex justify-center items-center"
                                title="Pesquisar"
                            >
                                <MagnifyingGlass 
                                    className="cursor-pointer" 
                                    onClick={() => {
                                        objetoSelecionado == "Arquivos" ? (
                                            handleObjetoChange("Templates"),
                                            handleObjetoChange("Arquivos")
                                        ) : (
                                            handleObjetoChange("Arquivos"),
                                            handleObjetoChange("Templates")
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 max-h-[100%] overflow-y-auto">
                    <table className="w-full bg-gray-300 rounded-t-2xl overflow-hidden">
                        <thead className="bg-green-800 text-white relative">
                            <tr className="">
                                {camposDisponiveis.map((campo, index) => (
                                <th key={index} className="w-1/4 text-center">
                                    {campo}
                                </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                    <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[100%] xl:max-h-[100%] rounded-b-2xl ">
                        <table className="w-full h-full bg-gray-300 rounded-b-2xl">
                            <tbody className="text-center h-full font-semibold text-zinc-600">
                                {listaAtiva.map((lista: any, index: any) => (
                                    <tr
                                        onClick={() => openModal(index)}
                                        key={index}
                                        className={`${
                                        index % 2 == 0 ? "bg-gray-200" : "bg-gray300"
                                        } cursor-pointer hover:bg-green-200`}
                                    >   
                                        {objetoSelecionado == "Arquivos" ? 
                                        <>
                                            <td className="w-1/4 text-start px-2">{lista['nome']}</td>
                                            <td className="w-1/4 text-start">{lista['template']}</td>
                                            <td className="w-1/4 text-start">{lista['enviado_por']}</td>
                                            <td className="w-1/4 text-center">
                                                {
                                                    (new Date(lista['data']).toLocaleDateString()) 
                                                }
                                            </td>
                                        </>
                                        : 
                                            <>
                                                <td className="w-1/4 text-start px-2">{lista['nome']}</td>
                                                <td className="w-1/4 text-center">{lista['formato']}</td> 
                                                <td className="w-1/4 text-center">{lista['criado_por']}</td>
                                                <td className="w-1/4 text-center">
                                                    {
                                                        (new Date(lista['data']).toLocaleDateString())
                                                    }  
                                                </td>
                                            </>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="p-5 select-none">
                                <div className="flex justify-between">
                                    <h2 className=" font-bold text-2xl">
                                        {modalContent ? modalContent.nome : ""}
                                    </h2>
                                    <X onClick={closeModal} className="text-3xl text-red-500 cursor-pointer"/>
                                </div>
                                <div className="flex justify-around items-center gap-4 pr-0">
                                    <div className="flex flex-col w-full">
                                        {objetoSelecionado == "Templates" ? 
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Data de criação:</span><span> {modalContent ? new Date(modalContent.data).toLocaleString() : ""}</span>
                                                <span className="font-semibold">Criado por:</span><span> {modalContent ? modalContent.criado_por : ""}</span>
                                            </div>
                                        :
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Data de criação:</span><span> {modalContent ? new Date(modalContent.data).toLocaleString() : ""}</span>
                                                <span className="font-semibold">Criado por:</span><span> {modalContent ? modalContent.enviado_por : ""}</span>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-col">
                                            {objetoSelecionado === "Templates" ? (
                                                <><span className="font-semibold">Número de colunas:</span><span> {modalContent && modalContent.campos}</span><span className="font-semibold">Formato:</span><span> {modalContent && modalContent.formato}</span><span className="font-semibold">Status:</span><span> {modalContent && modalContent.status == true ? "Ativo" : "Inativo"}</span></> 
                                            ) : (
                                                <>
                                                    <span className="font-bold">Template:</span>
                                                    <span>{modalContent && modalContent.template}</span>
                                                    <span className="font-bold">Salvo em:</span>
                                                    <span className="text-xs">/{modalContent && modalContent.download}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 flex-1">
                                        {objetoSelecionado == "Templates" && (
                                        <><div>
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
                                            </div><div className="bg-green-700 rounded-xl">
                                                    <div className="flex flex-col h-full justify-center items-center w-28 p-3 gap-3">
                                                        <div className="bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                                            {modalCampos && modalCampos[modalCamposIndex].nome}
                                                        </div>
                                                        <div className="bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                                            {modalCampos && modalCampos[modalCamposIndex].tipo}
                                                        </div>
                                                        <div className="bg-white w-full text-center rounded-xl px-2 overflow-hidden">
                                                            {modalCampos && modalCampos[modalCamposIndex].nulo == true ? "Nulo" : "Não nulo"}
                                                        </div>
                                                    </div>
                                                </div></>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-center items-center w-full pt-5">
                                    {objetoSelecionado == "Arquivos" ? (
                                        <>
                                            <a href={`http://127.0.0.1:5000/api/direct-file-download?full_path=${modalContent && modalContent.download}`} download className=" flex justify-center items-center gap-2 rounded-2xl text-white bg-green-800 hover:bg-green-600 p-2 px-4 font-semibold text-xl">
                                                Baixar <DownloadSimple className="text-white text-2xl" />
                                            </a> 
                                            <button onClick={() => deleteFile(modalContent.id, modalContent.download )} className="flex justify-center items-center gap-2 rounded-2xl text-white bg-red-800 hover:bg-red-600 p-2 px-4 font-semibold text-xl">
                                                Excluir<Trash className="text-white text-2xl" />
                                            </button>
                                        </>

                                    ) : (
                                        <><a href={`http://127.0.0.1:5000/api/templates/download/${modalContent && modalContent.id_criador}/${modalContent && modalContent.id}`} download className=" flex justify-center items-center gap-2 rounded-2xl text-white bg-green-800 hover:bg-green-600 p-2 px-4 font-semibold text-xl">
                                            Baixar <DownloadSimple className="text-white text-2xl" />
                                        </a>
                                        {/* <button className="flex justify-center items-center gap-2 rounded-2xl text-white bg-red-800 hover:bg-red-600 p-2 px-4 font-semibold text-xl">
                                                Excluir<Trash className="text-white text-2xl" />
                                        </button> */}
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        </Modal> 
                    </div>
                </div>
            </div>
        </div>
    )
}

