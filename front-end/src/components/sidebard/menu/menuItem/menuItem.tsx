import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import painelActive from "public/painel_active.svg";

interface MenuItemProps {
    nome: string;
    icon: string;
    activeIcon: string;
}

export default function MenuItem( props: MenuItemProps) {
    console.log("Painel: ",painelActive.src)

    const router = useRouter()
    
    const active1 = router.pathname.split("/")
    const path = active1[active1.length -1]
    console.log("teste: ",props.nome.toLowerCase())

    return (
        <div>
            <li >
                <Link href={`${props.nome.toLowerCase()}`}>
                    <Head>
                        <title>VerdeCard | {path[0].toUpperCase() + path.slice(1)}</title>
                    </Head>
                    <div className={`
                        flex rounded-xl ${path == props.nome.toLowerCase() ? "text-white" : "text-zinc-500"} font-bold text-xl items-center justify-between p-3 hover:cursor-pointer ${path == props.nome.toLowerCase() ? "bg-green-800 text-white" : "hover:bg-green-100"}
                    `}>
                        <span>{props.nome}</span>
                        <span>
                            <Image
                                src={path == props.nome.toLowerCase() ? `${props.activeIcon}` : props.icon}
                                width={42}
                                height={42}
                                alt="icone-dashboard"
                            />
                        </span>
                    </div>
                </Link>
            </li>
        </div>
    )
}