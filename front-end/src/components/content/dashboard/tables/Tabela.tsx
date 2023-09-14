export default function TabelaDashboard() {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center bg-white rounded-2xl">
            <div>
                <div className="flex justify-between">
                    <div>
                        Ordenar:
                        <select>
                            <option>Arquivo</option>    
                        </select>   
                        Por:
                        <select>
                            <option>Formato</option>    
                        </select>   
                    </div>
                    <div>
                        Total: 2456
                    </div>
                    <div>
                        <input className="outline-none border-2 rounded-2xl bg-zinc-300 text-center"  
                        type="text" placeholder="Pesquisar por formato"/>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}