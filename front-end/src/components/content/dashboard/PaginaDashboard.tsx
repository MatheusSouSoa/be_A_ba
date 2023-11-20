import Graficos from "./graphs/Graficos";
import TabelaDashboard from "./tables/Tabela";

export default function PaginaDashboard() {
    return (
        <div className="flex text-black w-full overflow-hidden h-full rounded-3xl items-center justify-around flex-col gap-4 px-5 py-5">
            <Graficos />
            <TabelaDashboard />
        </div>
    )
}