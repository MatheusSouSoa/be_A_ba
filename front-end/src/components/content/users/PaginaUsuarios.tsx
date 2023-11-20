import Link from "next/link";
import MenuUser from "./menuUser/MenuUser";

export default function PaginaUsuarios () {
    return (
        <div className="flex text-black w-full h-full rounded-3xl items-center justify-around flex-col gap-4 px-5 py-5">
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md hover:shadow-blue-100 hover:shadow-2xl transition duration-300 cursor-pointer  ">
                <Link href={"usuarios/editar-usuario"}>
                    <MenuUser titulo="Editar Permissões" descricao="Clique aqui para editar permissões de usuários já cadastrados" icone="/editar-permissoes.svg"/>
                </Link>
            </div>
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md hover:shadow-blue-100 hover:shadow-2xl transition duration-300 cursor-pointer  ">
                <Link href={"usuarios/solicitacoes-cadastro"}>
                    <MenuUser titulo="Usuários bloqueados" descricao="Clique aqui para acessar a página de solicitações de novos usuários" icone="/novos-usuarios.png"/>
                </Link>
            </div>
        </div>
    )
}