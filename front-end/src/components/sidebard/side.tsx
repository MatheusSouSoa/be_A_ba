import Menu from "./menu/menu";

export default function Side() {
    return (
        <>
            <div className="flex flex-col md:w-72 justify-between bg-white lg:shrink-0 ">
                <Menu/>
            </div>
        </>
    )
}