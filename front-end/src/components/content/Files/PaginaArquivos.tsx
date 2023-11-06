import Link from "next/link";
import { Folder, FolderOpen, FolderPlus } from "phosphor-react";

export default function PaginaArquivos () {
    return (
        <div className="flex text-black w-full h-full rounded-3xl items-center justify-around flex-col gap-4 px-5 py-5">
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md hover:shadow-blue-100 hover:shadow-2xl transition duration-300 cursor-pointer ">
                <Link href={"arquivos/meus-arquivos"} className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col flex-1 bg-white rounded-2xl overflow-hidden">
                        <div className=" p-3 flex justify-center items-center">
                            <h2 className="text-3xl font-black text-zinc-600">Meus arquivos</h2>
                        </div>
                        <div className=" flex-1 flex justify-center items-center">
                            <FolderOpen
                                weight="fill"
                                className="w-20 h-20  text-zinc-600"
                            />
                        </div>
                        <div className="p-3 flex justify-center items-center">
                            <h3 className="text-xl font-semibold text-zinc-600">Clique aqui para ver todos seus arquivos carregados</h3>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md hover:shadow-blue-100 hover:shadow-2xl transition duration-300 cursor-pointer  ">
                <Link href={"arquivos/validar-arquivo"} className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col flex-1 bg-white rounded-2xl overflow-hidden">
                        <div className=" p-3 flex justify-center items-center">
                            <h2 className="text-3xl font-black text-zinc-600">Validar novo arquivo</h2>
                        </div>
                        <div className=" flex-1 flex justify-center items-center">
                            <FolderPlus
                                weight="fill"
                                className="w-20 h-20 text-zinc-600"
                            />
                        </div>
                        <div className="p-3 flex justify-center items-center">
                            <h3 className="text-xl font-semibold text-zinc-600">Clique aqui para validar um novo arquivo</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}