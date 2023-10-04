import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconProps } from "phosphor-react";
import painelActive from "public/painel_active.svg";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

interface MenuItemProps {
    nome: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
    url: string
}

export default function MenuItem( { nome, url, icon:Icon}: MenuItemProps) {
    const {asPath} = useRouter()
    const isActive = asPath == "/templates/cadastrar-template" && nome == "Templates" ? true : asPath.includes(url)

    return (
        <li data-active={isActive} className="group">
            <Link href={url}>
                <div className="flex rounded-xl  font-bold text-xl items-center justify-between p-3 text-zinc-500 group-data-[active=false]:hover:bg-green-200 cursor-pointer group-data-[active=true]:text-white group-data-[active=true]:bg-green-800">
                    <span className="hidden md:block">{nome}</span>
                    <Icon weight="fill" className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:h10 lg:w-10" />
                </div>
            </Link>
        </li>
    )
}
