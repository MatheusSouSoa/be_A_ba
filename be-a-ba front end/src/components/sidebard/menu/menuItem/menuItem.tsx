import Image from "next/image";
import painelActive from "public/painel_active.svg";

interface MenuItemProps {
    nome: string;
    icon: string;
    active?: boolean;
}

export default function MenuItem( props: MenuItemProps) {
    console.log("Painel: ",painelActive.src)
    return (
        <div>
            <li >
                <a href={`${props.nome.toLowerCase()}`}>
                    <div className={`
                        flex rounded-xl text-zinc-500 font-bold text-xl items-center justify-between p-3 hover:cursor-pointer ${props.active === true ? "bg-green-800 text-white" : " hover:bg-green-100"}
                    `} >
                        <span>{props.nome}</span>
                        <span>
                            <Image
                                src={props.active ? `${painelActive.src}` : props.icon}
                                width={42}
                                height={42}
                                alt="icone-dashboard"
                            />
                        </span>
                    </div>
                </a>
            </li>
        </div>
    )
}