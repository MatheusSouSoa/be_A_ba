export default function User() {
    return (
        <div className="flex justify-around gap-5 items-center font-black  text-white ">
            <div className="">
                <div className="text-2xl cursor-pointer">Username</div>
                <div className="flex justify-end text-xs cursor-pointer underline text-zinc-300">Sair</div>
            </div>
            <div>
                <div className=" rounded-full bg-yellow-500 border-4 w-16 h-16 cursor-pointer">

                </div>
            </div>
        </div>
    )
}