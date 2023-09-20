export default function SelecaoTemplate() {
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
        </div>
    )
}