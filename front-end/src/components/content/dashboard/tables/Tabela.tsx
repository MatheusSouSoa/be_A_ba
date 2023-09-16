import Select from "@/components/util/select/Select";
import { useState } from "react";

const objetos = ["Arquivos", "Templates", "Usuários"]

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
    {nome: "Loja A", formato: "csv",  campos: 6, data: "2023-03-10", criado_por: "Matheus"},
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
    const [listaAtiva, setListaAtiva]: any = useState(arquivoLista)

    const handleObjetoChange = (e) => {
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

    const handleCampoChange = (e) => {
        const novoCampoSelecionado = e.target.value;
        setCampoSelecionado(novoCampoSelecionado);
    };

    
    return (
        <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4  ">
            <div className="flex flex-col flex-1 gap-2 p-4 max-h-[100%] ">
                <div className="flex justify-between font-bold text-zinc-700 ">
                <div className="flex justify-center items-center gap-5">
                    Ordenar:
                    <Select name="objeto" options={objetos} id="0" value={objetoSelecionado} onChange={handleObjetoChange} />
                    Por:
                    <Select name="campos" options={camposDisponiveis} id="1" value={campoSelecionado} onChange={handleCampoChange} />
                </div>

                    <div>
                        Total: 2456
                    </div>
                    <div>
                        <input className="outline-none border-2 rounded-2xl bg-zinc-200 px-5"  
                        type="text" placeholder="Pesquisar por formato"/>
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
                    <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[72%]">
                        <table className="w-full bg-gray-300 rounded-b-2xl">
                            <tbody className="text-center font-semibold text-zinc-600">
                                {listaAtiva.map((lista: any, index: any) => (
                                <tr
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
                    </div>
                </div>
            </div>
        </div>
    )
}

