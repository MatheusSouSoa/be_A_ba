import { DownloadSimple, HandPointing } from "phosphor-react"
import { useState } from "react"

const camposTemplate = ["Nome", "Formato", "Campos",  "Criado por", "Ativo"]
const templateLista = [
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja B", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Quero-quero", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "VerdeCard", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
]

interface SelecaoTemplateProps {
    handleSelectedTemplate: (template: any) => void;
}

export default function SelecaoTemplate({handleSelectedTemplate}: SelecaoTemplateProps) {

    

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="flex justify-between px-10 py-3 items-center bg-green-800">
                <div className="text-2xl font-bold text-white">
                    <h1>Selecione um template</h1>
                </div>
                <div>
                    <input 
                        type="text" 
                        className="pl-4 rounded-3xl outline-none"
                        placeholder="Campo de busca"
                    />
                </div>
            </div>
            <div>
                <table className="w-full text-center text-white font-semibold bg-green-500">
                    <thead className="w-full">
                        <tr className="w-full">
                            <td className="w-1/4">Nome</td>
                            <td className="w-1/4">Formato</td>
                            <td className="w-1/4">Campos</td>
                            <td className="w-1/4">Ações</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="overflow-y-auto scrollbar-custom">
                <table className="w-full text-center ">
                    <tbody className="w-full ">
                        {templateLista.map((item, index) => (
                            <tr key={index} className="w-full font-semibold">
                                <td className="w-1/4">{item.nome}</td>
                                <td className="w-1/4">{item.formato}</td>
                                <td className="w-1/4">{item.campos}</td>
                                <td className="w-full flex justify-center gap-10 items-cente ">
                                    <div title="Baixar template">
                                        <DownloadSimple className="cursor-pointer w-7 h-8"/>
                                    </div>
                                    <div title="Selecionar template para validação">
                                        <HandPointing
                                            className="cursor-pointer  w-7 h-7"
                                            onClick={() => handleSelectedTemplate(item)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}