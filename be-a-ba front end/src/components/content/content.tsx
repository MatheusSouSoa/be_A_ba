import Graficos from "./dashboard/graficos";

export default function Content () {
    return (
        <div className="flex flex-col gap-4 px-5 w-full h-full py-5">
            <Graficos/>
            <Graficos/>
        </div>
    )
}