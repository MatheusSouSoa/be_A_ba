import Select from "@/components/util/select/Select";

const objetos = ["Arquivos", "Templates", "Usuários"]
const campos = ["Nome", "Data criação"]

export default function TabelaDashboard() {
    return (
        <div className="flex flex-col w-full h-full items-cente bg-white rounded-2xl gap-4">
            <div className="flex flex-col flex-1 gap-2 p-4">
                <div className="flex justify-between font-bold text-zinc-700 ">
                    <div className="flex justify-center items-center gap-5">
                        Ordenar:
                        <Select name="objeto" options={objetos} id="0"/>
                        Por:
                        <Select name="campos" options={campos} id="1"/>
                    </div>
                    <div>
                        Total: 2456
                    </div>
                    <div>
                        <input className="outline-none border-2 rounded-2xl bg-zinc-200 px-5"  
                        type="text" placeholder="Pesquisar por formato"/>
                    </div>
                </div>
                <div className=" flex-1 ">
                    <table className="w-full bg-red-500 h-full">
                        <thead>
                            <tr>
                                <th>
                                    a
                                </th>
                                <th>
                                    a
                                </th>
                                <th>
                                    a
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    b
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    b
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    b
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}