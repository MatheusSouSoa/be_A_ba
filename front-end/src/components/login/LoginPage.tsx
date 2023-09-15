import Header from "../header/header";

export default function PaginaLogin() {
    return (
        <>
            <Header />
            <div className="bg-gray-300 bg-opacity-60 bg-[url(/bg-login.png)] bg-center bg-cover bg-no-repeat main-content">
                <div className="bg-gray-300 bg-opacity-60 h-full flex justify-center pt-20">
                    <div className="w-[25%] h-[70%] bg-white rounded-2xl text-zinc-700 text-2xl">
                        <ul className="flex flex-col p-4 gap-4 justify-center items-center">
                            <li className="flex flex-col gap-2">
                                <span>Login:</span>
                                <input type="text" className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" placeholder="Matricula" size={15} />
                            </li>
                            <li className="flex flex-col gap-2">
                                <span>Senha:</span>
                                <input type="text" className="outline-none border-2 rounded-2xl bg-zinc-100 px-2" placeholder="Sua senha" size={15} />
                            </li>
                            <li className="flex flex-col">
                                <button className="px-7 py-2 mt-3 bg-green-800 rounded-2xl text-white font-bold hover:bg-green-600">Login</button>
                                <button className="hover:underline mt-4">Criar conta</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}