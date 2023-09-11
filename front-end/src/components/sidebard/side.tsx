import Menu from "./menu/menu";

export default function Side() {
    return (
        <>
            <div className="flex flex-col w-72 justify-between bg-white ">
                <Menu/>
                <div className="flex justify-end p-5">
                    <button className="text-black font-semibold">Sair</button>
                </div>
            </div>
        </>
    )
}