import { UseAuth } from "@/hooks/useAuth";
import axios from "axios";
import { DownloadSimple, HandPointing } from "phosphor-react"
import { useEffect, useState } from "react"

const camposTemplate = ["Nome", "Formato", "Campos",  "Criado por", "Ativo"]


interface SelecaoTemplateProps {
    handleSelectedTemplate: (template: any) => void;
}

interface Template {
    nome: string;
    formato: string;
    campos: number;
    criado_por: string;
    status: boolean;
    isNew: boolean;
    pendentes?: string;
}

export default function SelecaoTemplate({handleSelectedTemplate}: SelecaoTemplateProps) {

    const [templateReq, setTemplateReq] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true); 
    const [search, setSearch] = useState("");
    const [campoSelecionado, setCampoSelecionado] = useState<keyof Template>("nome");

    const {config} = UseAuth()
  
    useEffect(() => {
        async function fetchTemplates() {
        const ip = process.env.NEXT_PUBLIC_IP || "localhost";

        try {
            const response = await axios.get(`http://${ip}:8080/api/template/getAll`, config);
            if (response.status === 200) {
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
    
    const filtered = search
        ? templateReq.filter((item: { [x: string]: any }) => {
            return String(item["nome"]).toLowerCase().includes(search.toLowerCase());
        })
        : templateReq;

    const sorted = filtered.sort((a, b) => {
        const fieldA = String(a["nome"]).toLowerCase();
        const fieldB = String(b["nome"]).toLowerCase();

        return fieldA.localeCompare(fieldB);
    });

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                        {sorted.map((item, index) => (
                            <tr key={index} className="w-full hover:bg-green-100">
                                <td className="w-1/4">{item.nome}</td>
                                <td className="w-1/4">{item.formato}</td>
                                <td className="w-1/4">{item.campos}</td>
                                <td className="w-full flex justify-center gap-10 items-cente p-1 ">
                                    <div 
                                        className="bg-green-800 flex gap-2 rounded-xl px-2 font-semibold text-white cursor-pointer hover:bg-green-600"
                                        title="Selecionar template para validação"
                                        onClick={() => handleSelectedTemplate(item)}
                                    >
                                        selecionar
                                        <HandPointing
                                            className="cursor-pointer  w-7 h-7"
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