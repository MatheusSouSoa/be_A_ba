import Image from "next/image"

interface MenuUserProps{
    titulo: string,
    icone: string,
    descricao: string
}

export default function MenuUser(props: MenuUserProps) {
    return (
        <div className="flex flex-col flex-1 bg-white rounded-2xl overflow-hidden ">
            <div className=" p-3 flex justify-center items-center">
                <h2 className="text-lg md:text-xl lg:text-2xl font-black text-zinc-600">{props.titulo}</h2>
            </div>
            <div className=" flex-1 flex justify-center items-center">
                <Image 
                    src={props.icone}
                    width={132}
                    height={132}
                    alt={"imagem " + props.titulo}
                    className="w-24 sm:w-28 md:w-32 xl:w-40 2xl:w-44"
                />
            </div>
            <div className="p-3 flex justify-center items-center">
                <h3 className="text-xs lg:text-lg font-semibold text-zinc-600">{props.descricao}</h3>
            </div>
        </div>
    )
}