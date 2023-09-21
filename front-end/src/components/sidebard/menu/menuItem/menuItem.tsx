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
                    <span>{nome}</span>
                    <Icon weight="fill" className="w-10 h-10" />
                </div>
            </Link>
        </li>
    )
}

// ${path == nome.toLowerCase() ? "text-white" : "text-zinc-500"}
// {path == nome.toLowerCase() ? "bg-green-800 text-white" : "hover:bg-green-200"}