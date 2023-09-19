import Link from "next/link";

export default function PaginaArquivos () {
    return (
        <div className="flex text-black w-full h-full rounded-3xl items-center justify-around flex-col gap-4 px-5 py-5">
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md hover:shadow-blue-100 hover:shadow-2xl transition duration-300 cursor-pointer  ">
                <Link href={"arquivos/meus-arquivos"} className="w-full h-full flex justify-center items-center">
                    Asfds
                </Link>
            </div>
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md hover:shadow-blue-100 hover:shadow-2xl transition duration-300 cursor-pointer  ">
                <Link href={"arquivos/validar-arquivo"} className="w-full h-full flex justify-center items-center">
                    Asfds
                </Link>
            </div>
        </div>
    )
}