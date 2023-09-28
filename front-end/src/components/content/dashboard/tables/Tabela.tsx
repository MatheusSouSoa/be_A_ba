import Modal from "@/components/util/modal/Modal";
import Select from "@/components/util/select/Select";
import { MagnifyingGlass, X } from "phosphor-react";
import { useEffect, useState } from "react";

const objetos = ["Arquivos", "Templates"]

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

const camposTemplate = ["Nome", "Formato", "Campos", "Data", "Criado por"]
const templateLista = [
    // {
    //     nome: "VerdeCard", 
    //     formato: "csv",  
    //     campos: [
    //         {nome: "nome", nulo: false, tipo_dado:"texto"},
    //         {nome: "Salario", nulo: false, tipo_dado:"moeda"},
    //         {nome: "idade", nulo: false, tipo_dado:"inteiro"}
    //     ], 
    //     data: "2023-03-10", 
    //     criado_por: "Matheus"
    // },
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
    const [campoSelecionado, setCampoSelecionado] = useState(camposArquivo[0]); // Valor inicial
    const [camposDisponiveis, setCamposDisponiveis] = useState(camposArquivo);
    const [listaAtiva, setListaAtiva]: any[]= useState(arquivoLista)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<any>()


    const openModal = (value: number) => {
        setIsModalOpen(true);
        setModalContent(listaAtiva[value]);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleObjetoChange = (e: any) => {
        const novoObjetoSelecionado = e.target.value;
        setObjetoSelecionado(novoObjetoSelecionado);

        // Atualize os campos disponíveis com base no objeto selecionado
        if (novoObjetoSelecionado === "Arquivos") {
            setListaAtiva(arquivoLista)
            setCamposDisponiveis(camposArquivo);
            setCampoSelecionado(camposArquivo[0]); // Defina o campo selecionado de volta para o valor padrão
        } else if (novoObjetoSelecionado === "Templates") {
            setListaAtiva(templateLista)
            setCamposDisponiveis(camposTemplate);
            setCampoSelecionado(camposTemplate[0]); // Defina o campo selecionado de volta para o valor padrão
        } else {
        // Defina uma lista de campos padrão para outros objetos, se necessário
            setCamposDisponiveis([]);
            setCampoSelecionado(""); // Defina o campo selecionado para vazio
        }
    };

    const handleCampoChange = (e: any) => {
        const novoCampoSelecionado = e.target.value;
        setCampoSelecionado(novoCampoSelecionado);
    
        // Atualize o total com base no campo selecionado
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
                            Total: 5643
                        </div>
                        <div className="flex justify-stretch md:justify-end md:items-end">
                            <input className=" max-w-[100px] sm:max-w-[150px] md:max-w-[190px] lg:max-w-[200px] xl:max-w-full outline-none border-2 rounded-l-2xl h-8 bg-zinc-200 px-5"  
                            type="text" placeholder="Buscas"/>
                            <div
                                className="w-8 h-8 bg-zinc-200 rounded-r-2xl flex justify-center items-center"
                                title="Pesquisar"
                            >
                                <MagnifyingGlass className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 max-h-[100%] ">
                    <table className="w-full bg-gray-300 rounded-t-2xl overflow-hidden">
                        <thead className="bg-green-800 text-white">
                            <tr className="">
                                {camposDisponiveis.map((campo, index) => (
                                <th key={index} className="w-1/6">
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
                                        <td key={index} className="w-1/6">{lista[lista2]}</td>
                                    ))}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div>
                                    <div className="flex justify-end" onClick={closeModal}>
                                        <X className="text-3xl text-red-500 cursor-pointer"/>
                                    </div>
                                    <div className="flex justify-between pr-10">
                                        <div className="flex flex-col w-full">
                                            <h2 className=" font-bold text-2xl">
                                                {modalContent ? modalContent.nome : ""}
                                            </h2>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Data de criação:</span><span> {modalContent ? modalContent.data : ""}</span>
                                                <span className="font-semibold">Criado por:</span><span> {modalContent ? modalContent.criado_por : ""}</span>
                                                {/* <span className="font-semibold">Número de colunas:</span><span> {modalContent && modalContent.campos ? modalContent.campos[0].nome : ""}</span> */}
                                                
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5 justify-center items-center w-full">
                                            <button className="rounded-2xl text-white bg-green-800 hover:bg-green-600 p-2 px-4 font-semibold text-xl">
                                                Baixar
                                            </button>
                                            <button className="rounded-2xl text-white bg-red-800 hover:bg-red-600 p-2 px-4 font-semibold text-xl">
                                                Excluir
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

