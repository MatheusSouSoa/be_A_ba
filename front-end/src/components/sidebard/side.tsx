import Menu from "./menu/menu";

export default function Side() {
    return (
        <>
            <div className="flex flex-col w-72 justify-between bg-white shrink-0 ">
                <Menu/>
            </div>
        </>
    )
}