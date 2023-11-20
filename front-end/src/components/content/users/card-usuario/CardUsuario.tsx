import Modal from "@/components/util/modal/Modal";
import { UseAuth } from "@/hooks/useAuth";
import axios from "axios";
import { X } from "phosphor-react";
import { useState } from "react";

interface UsuariosCardProps {
    id: number;
    nome: string;
    email: string;
    isadmin?: boolean;
    matricula: string;
    buttons?: string[];
    isNew?: boolean;
    pagina: string;
    onDelete: (index:number) => void;
}

export default function CardUsuario({ id, nome, email, isadmin, buttons, isNew, pagina, matricula, onDelete} : UsuariosCardProps): any {

    const [isAdmin, setIsAdmin] = useState(isadmin || false);
    const {config} = UseAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleRadioChange(event:any) {
        const novoStatus = event.target.value === "admin";
        setIsAdmin(novoStatus);
    }

    const closeModal= () => {
        setIsModalOpen(false)
    }

    async function  mudarPermissao(acao:string | undefined){

        const ip = process.env.NEXT_PUBLIC_IP || "localhost"

        if(acao && acao.toLocaleLowerCase() == "salvar"){
            console.log("salvar")
            try {
                const response = await axios.put(`http://${ip}:8080/api/admin/usuario/${id}/update-isnew/${isNew}/${isAdmin}`, {status: true}, config)
                
                if(response.status === 200){
                    return console.log(response.data)
                }
                return console.log(response.data)
            } catch (error) {
                console.error(error)
                console.log(error)
            }   
        }
        else if(acao && acao.toLocaleLowerCase() == "aprovar"){
            try {
                const response = await axios.put(`http://${ip}:8080/api/admin/usuario/${id}/update-isnew/false/${isAdmin}`, {status: true}, config)
                
                if(response.status === 200){
                    onDelete(response.data.id)
                    return (response.data.id)
                }
                return (response.data)
            } catch (error) {
                console.error(error)
                console.log(error)
            }   
        }
    }

    async function deletarUsuario(acao: string | undefined){
        const ip = process.env.NEXT_PUBLIC_IP || "localhost"

        if(acao && acao?.toLocaleLowerCase() == "bloquear"){
            try {
                const response = await axios.put(`http://${ip}:8080/api/admin/usuario/${id}/update-isnew/true/${isAdmin}`, {status: true}, config)
                if(response.status === 200){
                    onDelete(response.data.id)
                    return 
                }
                return 
            } catch (error) {
                console.error(error)
                console.log("bla: ",error)
            }
        }
        else {
            try {
                const response = await axios.delete(`http://${ip}:8080/api/admin/usuario/${id}/delete/${isAdmin}`, config)
                
                if(response.status === 200){
                    onDelete(response.data.id)
                    return console.log(response.data)
                }
                return console.log(response.data)
            } catch (error) {
                console.error(error)
                console.log(error)
                setIsModalOpen(true);
            }   
        }
    }

    return  (
        <div className={`
            w-full p-4 bg-zinc-100 text-zinc-700 rounded-3xl flex justify-around items-center text-md font-semibold
        `}>
            <div className="flex flex-col justify-around items-start gap-2">
                <h2 className="font-black text-2xl">
                    Dados:
                </h2>
                <div className="flex flex-1 flex-col justify-around gap-1 text-lg font-semibold">
                    <span>Nome: {nome}</span>
                    <span>Email: {email}</span>
                    <span>Matrícula: {matricula}</span>
                </div>
            </div>
            <div>
                <h2 className="font-black text-2xl">Permissões:</h2>
                <div className="flex flex-col justify-around gap-1 text-lg font-semibold">
                    <label className="cursor-pointer flex gap-2">
                        <input 
                            className="cursor-pointer"
                            type="radio"
                            name={"adminStatus"+id}
                            value="admin"
                            checked={isAdmin}
                            onChange={handleRadioChange}
                        />
                        Administrador
                    </label>
                    <label className="cursor-pointer flex gap-2">
                        <input
                            className="cursor-pointer"
                            type="radio"
                            checked={!isAdmin}
                            name={"adminStatus"+id}
                            value="cadastro"
                            onChange={handleRadioChange}
                        />
                        Cadastro
                    </label>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div>
                    <button 
                        className="p-2 px-6 bg-green-800 rounded-2xl font-bold text-white hover:bg-green-600"
                        onClick={() => mudarPermissao(buttons?.at(0))}
                    >
                        {buttons?.at(0)}
                    </button>
                </div>
                <div>
                    <button 
                        className="p-2 px-5 bg-zinc-600 rounded-2xl font-bold text-white hover:bg-zinc-400"
                        onClick={() => deletarUsuario(buttons?.at(1))}
                    >
                        {buttons?.at(1)}
                    </button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex justify-center items-center flex-col">
                    <span className="text-3xl">Usuário possui arquivos ou templates e não pode ser excluído</span>
                    <button className="bg-red-500 text-4xl px-6 py-2 text-white rounded-xl text-center hover:bg-red-400" onClick={closeModal}>ok</button>
                </div>
            </Modal>
        </div>
    )
}