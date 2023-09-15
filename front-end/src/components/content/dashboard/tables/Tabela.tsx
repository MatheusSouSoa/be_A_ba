import Select from "@/components/util/select/Select";

const objetos = ["Arquivos", "Templates", "Usuários"]
const camposArquivo = ["Nome","Formato", "Data", "Linhas", "Template", "Criado por"]
const arquivoLista = [
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
    {nome: "Loja 01", formato: "csv", data: "2023-05-05", linhas: 67, template: "Loja A", criado_por: "Matheus"},
]
export default function TabelaDashboard() {
    return (
        <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4">
            <div className="flex flex-col flex-1 gap-2 p-4 max-h-[100%]">
                <div className="flex justify-between font-bold text-zinc-700 ">
                    <div className="flex justify-center items-center gap-5">
                        Ordenar:
                        <Select name="objeto" options={objetos} id="0"/>
                        Por:
                        <Select name="campos" options={camposArquivo} id="1"/>
                    </div>
                    <div>
                        Total: 2456
                    </div>
                    <div>
                        <input className="outline-none border-2 rounded-2xl bg-zinc-200 px-5"  
                        type="text" placeholder="Pesquisar por formato"/>
                    </div>
                </div>
                <div className=" flex-1 overflow-y-auto scrollbar-custom">                
                    <table className="w-full h-full bg-gray-300 rounded-2xl overflow-hidden ">
                        <thead className="bg-green-800 text-white">
                            <tr className="">
                                {camposArquivo.map((campo, index) => (
                                    <th key={index}>{campo}</th>       
                                ))}
                            </tr>
                        </thead>
                        <tbody className=" text-center font-semibold text-zinc-600">
                            {arquivoLista.map((arquivo, index) => (
                                <tr key={index} className={`${index % 2 == 0? "bg-gray-200" : "bg-gray300"} cursor-pointer hover:bg-green-200`}>
                                    <td>
                                        {arquivo.nome}
                                    </td>
                                    <td>
                                        {arquivo.formato}
                                    </td>
                                    <td>
                                        {arquivo.data}
                                    </td>
                                    <td>
                                        {arquivo.linhas}
                                    </td>
                                    <td>
                                        {arquivo.template}
                                    </td>
                                    <td>
                                        {arquivo.criado_por}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

{/* <table className="w-full bg-red-500 rounded-2xl overflow-hidden">
                            <thead className="bg-green-800 text-white ">
                                <tr className="rounded-2xl">
                                    {campos.map((campo, index) => (
                                        <th key={index}>{campo}</th>       
                                    ))}
                                </tr>
                            </thead> */}

// const obj = {
//     arquivo: {
//         nome_arquivo: "Arquivos",
//         template: {
//             nome_template: "Clientes 1",
//             campos: {
//                 nome: {
//                     nome: "Nome",
//                     tipo_dado: "varchar"
//                 },
//                 formato: {
//                     nome: "Formato",
//                     tipo_dado: "varchar"
//                 },
//                 data: {
//                     nome: "Data",
//                     tipo_dado: "date"
//                 }
//             },
//             criado_por: "Matheus",
//             data_criacao: "2023-09-14"
//         },
//         criado_por: "Matheus",
//         data_criacao: "2023-09-14",
//         numero_de_linhas: 67
//     },
// }