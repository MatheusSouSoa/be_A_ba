import Image from "next/image"

interface MenuUserProps{
    titulo: string,
    icone: string,
    descricao: string
}

export default function MenuUser(props: MenuUserProps) {
    return (
        <div className="flex flex-col flex-1 bg-white rounded-2xl overflow-hidden">
            <div className=" p-3 flex justify-center items-center">
                <h2 className="text-3xl font-black text-zinc-600">{props.titulo}</h2>
            </div>
            <div className=" flex-1 flex justify-center items-center">
                <Image 
                    src={props.icone}
                    width={132}
                    height={132}
                    alt={"imagem" + props.titulo}
                />
            </div>
            <div className="p-3 flex justify-center items-center">
                <h3 className="text-xl font-semibold text-zinc-600">{props.descricao}</h3>
            </div>
        </div>
    )
}